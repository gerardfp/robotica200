'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');

// Executa el bloqueig real amb un build controlat, sense tocar dist ni altres builds.
const source = fs.readFileSync(path.join(__dirname, '../build.js'), 'utf8');
const mainSource = source.slice(source.indexOf('async function main(options'), source.indexOf('if (require.main === module)'));

async function check(action, fails = false) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'robotica-lock-test-'));
  const events = new EventEmitter();
  events.pid = process.pid;
  events.kill = process.kill.bind(process);
  let lockPath;
  const context = {
    fs, path, ROOT_DIR: dir, process: events, setTimeout,
    require: name => name === 'node:os' ? { tmpdir: () => dir } : require(name),
    build: async () => {
      lockPath = path.join(dir, fs.readdirSync(dir)[0]);
      await action(lockPath);
      if (fails) throw new Error('build failure');
      return 'built';
    }
  };
  vm.runInNewContext(`${mainSource}\nthis.run = main;`, context);
  try {
    if (fails) await assert.rejects(context.run(), /build failure/);
    else assert.equal(await context.run(), 'built');
    assert.equal(events.listenerCount('exit'), 0);
    return fs.existsSync(lockPath) ? fs.readFileSync(lockPath, 'utf8') : null;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

(async () => {
  assert.equal(await check(() => {}), null);
  assert.equal(await check(p => fs.unlinkSync(p)), null);
  assert.equal(await check(p => {
    fs.unlinkSync(p);
    fs.writeFileSync(p, 'another owner');
  }), 'another owner');
  assert.equal(await check(p => fs.unlinkSync(p), true), null);
  console.log('Build lock: normal release, missing file, replacement owner and build failure passed.');
})().catch(err => { console.error(err); process.exitCode = 1; });
