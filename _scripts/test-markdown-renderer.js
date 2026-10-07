#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const renderer = require("../_js/markdown.js");

const root = path.resolve(__dirname, "..");
const pilotPath = path.join(root, "_content/situacions/sp-llistes-condicions.md");
const pilot = renderer.parse(fs.readFileSync(pilotPath, "utf8"), "https://example.test/_content/situacions/sp-llistes-condicions.md");
assert.equal(pilot.data.title, "Lògica per a una escola oberta");
assert.equal(pilot.data.robot, "spike");
assert.equal(pilot.steps.length, 6, "cada lliçó ha de ser una targeta navegable");
assert.equal((pilot.html.match(/class="learning-phase"/g) || []).length, 18, "cada lliçó mostra les seues tres fases");
assert.equal((pilot.html.match(/class="code-panel"/g) || []).length, 2, "els exemples pseudocodi i Python es renderitzen com a blocs");
assert.equal((pilot.html.match(/class="sa-illustration"/g) || []).length, 1, "la portada Markdown es renderitza com a figura de situació");
assert.match(pilot.html, /<figcaption>Una llista guarda/, "els peus d'imatge separats per una línia en blanc es mantenen dins de la figura");
assert.doesNotMatch(pilot.html, /<p>_[^<]+_<\/p>/, "el peu d'imatge no apareix amb els guions baixos literals");
assert.match(pilot.html, /syntax-keyword/, "el codi Python rep ressaltat sintàctic");
assert.match(pilot.html, /href="https:\/\/assets\.education\.lego\.com\//, "els enllaços externs es conserven");

const contentDir = path.join(root, "_content/situacions");
const activeFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith(".md") && file !== "TEMPLATE-SITUACIO.md")
  .map(file => ({ file, source: fs.readFileSync(path.join(contentDir, file), "utf8") }))
  .filter(item => /^active:\s*true\s*$/m.test(item.source));
const slugs = new Set();
for (const item of activeFiles) {
  const slug = item.file.slice(0, -3);
  assert.ok(!slugs.has(slug), `${slug} està duplicat`);
  slugs.add(slug);
  const rendered = renderer.parse(item.source, `https://example.test/_content/situacions/${item.file}`);
  assert.ok(rendered.data.title && rendered.data.robot && rendered.data.description, `${slug} necessita metadades editorials`);
  assert.ok(rendered.steps.length > 0, `${slug} necessita passos estructurats`);
  assert.match(rendered.html, /class="sa-illustration"/, `${slug} necessita una imatge editorial`);
}
const catalogText = fs.readFileSync(path.join(root, "_js/cataleg.js"), "utf8");
const catalog = JSON.parse(catalogText.slice(catalogText.indexOf("{")).replace(/;\s*$/, ""));
assert.equal(activeFiles.length, 99, "la validació cobreix totes les SDAs actives");
assert.equal(catalog.situacions.length, activeFiles.length, "el catàleg conté totes les SDAs actives");
for (const item of catalog.situacions) {
  assert.equal(item.url, `situacio/index.html?id=${item.slug}`, `${item.slug} enllaça amb la pàgina compartida`);
}
const expectedDetailKinds = [
  ["activitat", "activity", "activitats", "activitat-", 10, catalog.activitats],
  ["tutorial", "tutorial", "tutorials", "tutorial-", 22, catalog.tutorials],
  ["robot", "robot", "robots", "robot-", 6, catalog.robots],
  ["guia", "guide", "pages", "guia-", 3, null]
];
for (const [route, kind, folder, prefix, expected, entries] of expectedDetailKinds) {
  const page = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
  assert.match(page, new RegExp(`<content-detail-page kind="${kind}"`), `${route} utilitza el component compartit`);
  const docs = fs.readdirSync(path.join(root, "_content", folder)).filter(file => file.startsWith(prefix) && file.endsWith(".md"));
  assert.equal(docs.length, expected, `${route} té el nombre esperat de documents Markdown`);
  assert.equal(fs.readdirSync(path.join(root, route)).filter(file => fs.existsSync(path.join(root, route, file, "index.html"))).length, 0, `${route} no manté shells HTML per document`);
  if (entries) {
    assert.equal(entries.length, expected, `catàleg ${route} sincronitzat des del Markdown`);
    assert.ok(entries.every(item => item.url.startsWith(`${route}/index.html?id=`)), `les targetes ${route} usen una ruta compartida`);
  }
}
const robotMarkdown = fs.readFileSync(path.join(root, "_content/robots/robot-spike.md"), "utf8");
const robotRecord = renderer.parse(robotMarkdown, "https://example.test/_content/robots/robot-spike.md");
assert.equal(robotRecord.data.specs.length, 5, "les especificacions de robot es llegeixen del front matter");
assert.equal(robotRecord.data.official_resources.length, 2, "els recursos oficials de robot es llegeixen del front matter");
const sharedPage = fs.readFileSync(path.join(root, "situacio/index.html"), "utf8");
const pageTemplate = fs.readFileSync(path.join(root, "_templates/situation-page.html"), "utf8");
const componentSource = fs.readFileSync(path.join(root, "_js/components.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "_css/styles.css"), "utf8");
assert.match(sharedPage, /<situation-page root="\.\.\/">/, "hi ha una única pàgina de detall compartida");
for (const templateId of ["situation-page-template", "situation-page-loading-template", "situation-page-error-template"]) {
  assert.match(pageTemplate, new RegExp(`id="${templateId}"`), `falta la plantilla ${templateId}`);
}
assert.equal(fs.readdirSync(path.join(root, "situacio")).filter(name => fs.statSync(path.join(root, "situacio", name)).isDirectory()).length, 0, "no hi ha shells HTML individuals");
assert.match(componentSource, /new URLSearchParams\(window\.location\.search\)/, "la pàgina tria el Markdown a partir de l'ID de la URL");
assert.match(componentSource, /contentDetail: true/, "les fitxes canvien de contingut sense recarregar el document");
assert.match(componentSource, /addEventListener\('popstate'/, "el botó enrere/avant del navegador restaura la fitxa corresponent");
assert.match(componentSource, /loadFromLocation\(route\[1\]\)/, "la ruta AJAX actualitza el tipus i l'identificador de la fitxa");
assert.match(componentSource, /heading\.focus\(\{ preventScroll: true \}\)/, "el canvi de contingut mou el focus al títol");
assert.match(componentSource, /situationDetail: true/, "les situacions també canvien de fitxa sense recarregar el document");
assert.match(componentSource, /_onSituationPopstate/, "l'historial del navegador restaura les situacions");
assert.match(componentSource, /function initializeLearningWizard/, "les sessions s'inicialitzen com un assistent de passos");
assert.match(componentSource, /aria-valuetext/, "el progrés del wizard té una descripció accessible");
assert.match(componentSource, /sequenceHeading\.after\(index\)/, "la navegació apareix junt a la seqüència, després del context");
assert.ok(componentSource.includes('contentHasChallenge = /<h2\\b[^>]*>[^<]*(?:repte|pregunta guia)/i.test(parsed.html)'), "el repte no es duplica si ja té una secció pròpia");
assert.match(styles, /\.learning-step\[hidden\]/, "els passos no actius es retiren de la lectura visual");

const unsafe = renderer.parse('## Prova\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))', "https://example.test/a.md");
assert.doesNotMatch(unsafe.html, /<script>/, "el Markdown no interpreta HTML cru");
assert.doesNotMatch(unsafe.html, /href="javascript:/i, "els enllaços amb esquemes no permesos es rebutgen");
assert.match(unsafe.html, /&lt;script&gt;/, "el contingut HTML cru s'escapa com a text");

console.log(`Markdown renderer tests passed: ${activeFiles.length} active situations, ${activeFiles.reduce((total, item) => total + renderer.parse(item.source, "https://example.test/source.md").steps.length, 0)} navigable steps, template states, accessible wizard, code, images, links and escaping.`);
