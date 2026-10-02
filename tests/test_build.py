"""Integration checks for authoring, full builds and failure recovery."""
from pathlib import Path
import shutil
import tempfile
import unittest

from jinja2 import UndefinedError
from scripts.build import ROOT, ContentError, build, load_content, read_yaml


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'project'
        self.root.mkdir()
        for name in ('content', 'templates', 'css', 'js', 'assets'):
            shutil.copytree(ROOT / name, self.root / name)
        self.out = self.root / 'dist'

    def edit(self, relative, old, new):
        path = self.root / relative
        self.assertIn(old, path.read_text())
        path.write_text(path.read_text().replace(old, new))

    def test_complete_deterministic_offline_build(self):
        count = build(self.root)
        sources = list((self.root / 'content').rglob('*.md'))
        self.assertEqual(count, len(sources))
        self.assertEqual({p.stem for p in sources}, {p.stem for p in self.out.glob('*.html')})
        snapshot = {p.relative_to(self.out): p.read_bytes() for p in self.out.rglob('*') if p.is_file()}
        build(self.root)
        self.assertEqual(snapshot, {p.relative_to(self.out): p.read_bytes() for p in self.out.rglob('*') if p.is_file()})
        self.assertTrue((self.out / 'assets/robots/codeyrocky.jpg').exists())
        self.assertFalse((self.out / 'assets/originals').exists())
        self.assertFalse((self.out / 'content').exists())

    def test_add_and_remove_tutorial_updates_parent_and_catalog(self):
        source = self.root / 'content/tutorials/tutorial-cr-primeres-passes.md'
        new = source.with_name('tutorial-cr-nou.md')
        new.write_text(source.read_text().replace('Connexió a mBlock 5', 'Nova activitat de prova'))
        build(self.root)
        parent = (self.out / 'robot-codeyrocky.html').read_text()
        self.assertIn('tutorial-cr-nou.html', parent)
        self.assertIn('Nova activitat de prova', parent)
        self.assertIn('4 tutorials', (self.out / 'robotica.html').read_text())
        self.assertIn('robot-codeyrocky.html', (self.out / 'tutorial-cr-nou.html').read_text())
        new.unlink()
        build(self.root)
        self.assertFalse((self.out / 'tutorial-cr-nou.html').exists())
        self.assertNotIn('tutorial-cr-nou.html', (self.out / 'robot-codeyrocky.html').read_text())

    def test_new_robot_automatically_enters_filter(self):
        robot = self.root / 'content/robots/robot-spike.md'
        robot.with_name('robot-nou.md').write_text(robot.read_text().replace('Spike', 'Nou'))
        build(self.root)
        self.assertIn('<option value="nou">Nou</option>', (self.out / 'situacions-aprenentatge.html').read_text())
        self.assertIn('robot-nou.html', (self.out / 'robotica.html').read_text())

    def test_multicycle_metadata_survives_build(self):
        build(self.root)
        html = (self.out / 'situacions-aprenentatge.html').read_text()
        self.assertIn('data-cicle="cicle-superior eso"', html)
        self.assertIn('data-cicle="cicle-mitja cicle-superior"', html)
        self.assertIn('data-cicle="cicle-inicial cicle-mitja"', html)

    def test_invalid_taxonomy_has_filename_and_keeps_last_build(self):
        build(self.root)
        before = (self.out / 'situacions-aprenentatge.html').read_bytes()
        self.edit('content/situacions/situacio-sa-ciutat-accessible.md', 'theme: ciutat', 'theme: typo')
        with self.assertRaisesRegex(ContentError, 'situacio-sa-ciutat-accessible.md: theme desconocido'):
            build(self.root)
        self.assertEqual(before, (self.out / 'situacions-aprenentatge.html').read_bytes())

    def test_unknown_robot_rejected(self):
        self.edit('content/tutorials/tutorial-cr-primeres-passes.md', 'robot: codeyrocky', 'robot: missing')
        with self.assertRaisesRegex(ContentError, 'robot desconocido'):
            build(self.root)

    def test_missing_local_resource_rejected_before_writing(self):
        source = self.root / 'content/activitats/activitat-robot-huma.md'
        source.write_text(source.read_text() + '\n![Missing](assets/missing.png)\n')
        with self.assertRaisesRegex(ContentError, 'assets/missing.png'):
            build(self.root)
        self.assertFalse(self.out.exists())

    def test_duplicate_urls_and_yaml_keys_rejected(self):
        source = self.root / 'content/activitats/activitat-robot-huma.md'
        shutil.copyfile(source, self.root / 'content/tutorials' / source.name)
        with self.assertRaisesRegex(ContentError, 'URL duplicada'):
            build(self.root)
        with self.assertRaisesRegex(ContentError, 'Clave YAML repetida'):
            read_yaml('title: A\ntitle: B\n', 'example.md')

    def test_modal_and_multiple_h1_rejected(self):
        source = self.root / 'content/activitats/activitat-robot-huma.md'
        original = source.read_text()
        for text, error in [('<dialog>Popup</dialog>', 'modales'), ('# Otro título', 'exactamente un h1')]:
            with self.subTest(text=text):
                source.write_text(original + '\n' + text + '\n')
                with self.assertRaisesRegex(ContentError, error):
                    build(self.root)

    def test_output_cannot_overwrite_sources_or_existing_user_files(self):
        for output in (self.root, self.root / 'content', self.root / 'templates/output'):
            with self.subTest(output=output), self.assertRaises(ContentError):
                build(self.root, output)
        self.out.mkdir()
        (self.out / 'notes.txt').write_text('keep')
        with self.assertRaisesRegex(ContentError, 'no pertenece'):
            build(self.root)
        self.assertEqual((self.out / 'notes.txt').read_text(), 'keep')

    def test_template_typo_fails_without_replacing_output(self):
        build(self.root)
        previous = (self.out / 'index.html').read_bytes()
        self.edit('templates/home.html', '{{ page.title }}', '{{ page.typo }}')
        with self.assertRaises(UndefinedError):
            build(self.root)
        self.assertEqual(previous, (self.out / 'index.html').read_bytes())

    def test_metadata_is_escaped_and_markdown_is_rendered(self):
        source = self.root / 'content/activitats/activitat-robot-huma.md'
        source.write_text(source.read_text().replace('topic: Algorismes i Precisió', 'topic: <script>alert(1)</script>') + '\nUn text **destacat**.\n')
        build(self.root)
        html = (self.out / 'activitat-robot-huma.html').read_text()
        self.assertIn('&lt;script&gt;alert(1)&lt;/script&gt;', html)
        self.assertIn('<strong>destacat</strong>', html)
        self.assertNotIn('<script>alert(1)</script>', html)


if __name__ == '__main__':
    unittest.main()
