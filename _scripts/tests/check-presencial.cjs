#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const os=require('node:os');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
const firstSlideCount=JSON.parse(fs.readFileSync(path.join(root,'formacio/sessions.json'),'utf8')).find(s=>s.id==='01-descobrir-i-triar').slideCount;
const {chromium}=require(require.resolve('playwright',{paths:[path.join(root,'formacio')]}));
const {publishPresencial,configuredPassword,encrypt,decrypt:decryptCached,sourceDigest,ITERATIONS}=require('../lib/presencial');
(async()=>{
 const password=configuredPassword(root);assert(password,'Cal configurar una contrasenya local per a la prova.');
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'presencial-test-'));
 const empty=publishPresencial({root,dist:temporary,password:'',compile:false});assert.equal(empty.enabled,false);
 assert(!fs.existsSync(path.join(temporary,'presencial/index.enc.json')));
 const dir=path.join(root,'dist/presencial');assert(fs.existsSync(path.join(dir,'index.enc.json')),'Genera /presencial/ abans de provar.');
 const salt=crypto.randomBytes(16);const key=crypto.pbkdf2Sync('password-de-prova',salt,ITERATIONS,32,'sha256');
 const example=encrypt(Buffer.from('material de prova'),key,salt,'test','text/html','test.html');
 async function decrypt(p,k){return crypto.webcrypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(p.iv,'base64'),additionalData:Buffer.from(JSON.stringify([p.version,p.id,p.mime,p.filename]))},await crypto.webcrypto.subtle.importKey('raw',k,'AES-GCM',false,['decrypt']),Buffer.from(p.data,'base64'))}
 assert.equal(Buffer.from(await decrypt(example,key)).toString(),'material de prova');
 await assert.rejects(decrypt(example,crypto.randomBytes(32)));
 await assert.rejects(decrypt({...example,id:'un-altre-document'},key));
 await assert.rejects(decrypt({...example,mime:'application/pdf'},key));
 const tampered=Buffer.from(example.data,'base64');tampered[0]^=1;await assert.rejects(decrypt({...example,data:tampered.toString('base64')},key));
 const encryptedCache=path.join(root,'.cache/presencial-encrypted-pdfs');
 const cacheManifest=JSON.parse(fs.readFileSync(path.join(encryptedCache,'manifest.json'),'utf8'));
 assert.equal(cacheManifest.digest,sourceDigest(root));
 const cachedFiles=fs.readdirSync(encryptedCache).filter(f=>f.endsWith('.enc.json'));assert.equal(cachedFiles.length,6);
 for(const file of cachedFiles){
  const payload=JSON.parse(fs.readFileSync(path.join(encryptedCache,file),'utf8'));
  assert(decryptCached(payload,password).equals(fs.readFileSync(path.join(root,'formacio/export',payload.filename))));
 }
 // Reproduce a clean CI checkout: PDFs are absent, only the encrypted cache is restored.
 const fixture=path.join(temporary,'checkout');fs.mkdirSync(path.join(fixture,'formacio'),{recursive:true});
 for(const name of ['_scripts','_templates','_assets','_cache'])fs.symlinkSync(path.join(root,name),path.join(fixture,name),'dir');
 for(const name of ['presentacions','fonts','tema.css','sessions.json','html','diagrames'])fs.symlinkSync(path.join(root,'formacio',name),path.join(fixture,'formacio',name));
 fs.mkdirSync(path.join(fixture,'.cache'),{recursive:true});
 fs.cpSync(encryptedCache,path.join(fixture,'.cache/presencial-encrypted-pdfs'),{recursive:true});
 assert(!fs.existsSync(path.join(fixture,'formacio/export')));
 const restored=publishPresencial({root:fixture,dist:path.join(fixture,'dist'),password,compile:false});
 assert.equal(restored.reusedPDFs,true);
 for(const file of cachedFiles){
  const payload=JSON.parse(fs.readFileSync(path.join(encryptedCache,file),'utf8'));
  assert(fs.readFileSync(path.join(fixture,'formacio/export',payload.filename)).equals(fs.readFileSync(path.join(root,'formacio/export',payload.filename))));
 }
 const files=fs.readdirSync(dir);
 assert.equal(files.filter(f=>f.endsWith('.enc.json')).length,13);
 assert(!files.some(f=>/\.(pdf|md)$/.test(f)));
 for(const file of files.filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(path.join(dir,file),'utf8');assert(html.includes('noindex,nofollow,noarchive'));assert(!html.includes(password));assert(!html.includes('Codey · Llegim el programa'));
 }
 for(const file of ['_templates/pages/home-page.js','_templates/layout/site-header.js','_templates/layout/site-footer.js'])assert(!fs.readFileSync(path.join(root,file),'utf8').includes('presencial/'));
 const prefix='/robotica200/';const mime={'.js':'application/javascript','.json':'application/json','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.ttf':'font/ttf'};
 const server=http.createServer((req,res)=>{
  let route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!route.startsWith(prefix)){res.writeHead(404).end();return}
  route=route.slice(prefix.length);if(!route||route.endsWith('/'))route+='index.html';
  const file=path.resolve(root,'dist',route);const dist=path.join(root,'dist')+path.sep;
  if(!file.startsWith(dist)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${server.address().port}${prefix}presencial/`;
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 try{
  const beforeScripts=await browser.newPage();await beforeScripts.route('**/access.js',route=>route.abort());
  await beforeScripts.goto(url);assert(await beforeScripts.locator('#password').isDisabled());
  assert(await beforeScripts.getByRole('button',{name:'Accedir als materials'}).isDisabled());await beforeScripts.close();
  const page=await browser.newPage({viewport:{width:1280,height:900},acceptDownloads:true});
  await page.goto(url);await page.locator('#password').waitFor();
  await page.screenshot({path:path.join(root,'formacio/.revisio/presencial-login.png')});
  await page.locator('#password').fill('contrasenya-incorrecta');await page.getByRole('button',{name:'Accedir als materials'}).click();
  await page.waitForFunction(()=>document.querySelector('#access-status')?.textContent.includes('incorrecta'));
  await page.locator('#password').fill(password);await page.getByRole('button',{name:'Accedir als materials'}).click();
  await page.getByRole('heading',{name:'Format de 3 sessions · 6 hores'}).waitFor();
  assert.equal(await page.getByRole('link',{name:'Obrir presentació →',exact:true}).count(),6);
  assert.equal(await page.getByRole('link',{name:'PDF',exact:true}).count(),6);
  await page.getByRole('link',{name:'Obrir presentació →',exact:true}).first().click();
  await page.locator('section[id="1"]').waitFor();assert.equal(await page.locator('section[id]').count(),firstSlideCount);
  await page.waitForFunction(()=>[...document.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth));
  assert.equal(await page.locator('#password').count(),0);
  assert.equal(await page.locator('.bespoke-marp-note').first().isVisible(),false,'Les notes no han de veure’s en la projecció.');
  const pendingPresenter=page.waitForEvent('popup');await page.keyboard.press('p');
  const presenter=await pendingPresenter;
  await presenter.locator('body[data-bespoke-view="presenter"]').waitFor();
  await page.keyboard.press('ArrowRight');
  await presenter.locator('.bespoke-marp-note[data-index="1"]').waitFor({state:'visible'});
  assert((await presenter.locator('.bespoke-marp-note[data-index="1"]').innerText()).includes('00–15 min de sessió'));
  await presenter.screenshot({path:path.join(root,'formacio/.revisio/presencial-presenter-notes.png')});
  await presenter.close();
  await page.getByRole('link',{name:'Materials',exact:true}).click();await page.getByRole('heading',{name:'Format de 3 sessions · 6 hores'}).waitFor();
  await page.getByRole('link',{name:'PDF',exact:true}).first().click();await page.locator('.pdf-viewer').waitFor();
  const pending=page.waitForEvent('download');await page.getByRole('link',{name:'Descarrega el PDF',exact:true}).click();
  const download=await pending;const downloaded=path.join(temporary,'presentation.pdf');await download.saveAs(downloaded);
  const original=fs.readFileSync(path.join(root,'formacio/export',download.suggestedFilename()));
  assert(fs.readFileSync(downloaded).equals(original),'El PDF descarregat ha de coincidir amb l’original.');
  await page.getByRole('button',{name:'Tancar sessió'}).click();await page.locator('#password').waitFor();
  assert.equal(await page.evaluate(()=>Object.keys(sessionStorage).filter(k=>k.startsWith('robotica-presencial:')).length),0);
  await page.goBack();await page.waitForTimeout(400);assert.equal(await page.locator('#password').count(),1);
  const response=await page.request.get(url+'01-descobrir-i-triar.pdf');assert.equal(response.status(),404);
  const mobile=await browser.newPage({viewport:{width:390,height:844}});await mobile.goto(url);await mobile.locator('#password').waitFor();
  assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await mobile.screenshot({path:path.join(root,'formacio/.revisio/presencial-login-mobile.png')});
  console.log('✓ Xifrat, clau incorrecta, integritat, accés directe, navegació amb subruta, sessió, notes natives de Marp, eixida, PDF descarregable i mòbil.');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));fs.rmSync(temporary,{recursive:true,force:true})}
})().catch(error=>{console.error(error.message);process.exitCode=1});
