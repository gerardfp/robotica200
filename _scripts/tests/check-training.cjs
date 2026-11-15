#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..');
const {chromium}=require(require.resolve('playwright',{paths:[path.join(root,'formacio')]}));
(async()=>{
 const dir=path.join(root,'formacio/.revisio');fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 const sessions=JSON.parse(fs.readFileSync(path.join(root,'formacio/sessions.json'),'utf8'));
 const programManifest=JSON.parse(fs.readFileSync(path.join(root,'formacio/.revisio/programs.json'),'utf8'));
 const renderer=require('../lib/markdown');
 for(const program of programManifest){
  const fence='```'+program.lang+'\n'+program.code+'\n```';
  const html=renderer.parse(fence).html;
  const expected=html.slice(html.indexOf('<svg'),html.lastIndexOf('</svg>')+6);
  const actual=fs.readFileSync(path.join(root,'formacio/diagrames',program.filename),'utf8');
  if(actual!==expected)throw Error('El programa no coincideix amb el renderitzador del web: '+program.lang);
 }
 console.log(`${programManifest.length} programes: mateix resultat que el pipeline del web.`);
 const report=[];
 for(const session of sessions){
  let end=0;
  for(const block of session.schedule){if(block.start!==end || block.end<=end)throw Error('Temps inconsistents: '+session.id);end=block.end;}
  if(end!==120)throw Error('La sessió no suma 120 minuts: '+session.id);
 }
 try {
 for(const session of sessions){
  const url=pathToFileURL(path.join(root,'formacio/html',session.id+'.html')).href;
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  // Native Marp auxiliary sections contain background pictures; numbered sections carry the actual content.
  const count=await page.locator('section[id]').count();
  if(count!==session.slideCount)throw Error(`${session.id}: ${count} slides, expected ${session.slideCount}`);
  for(let n=1;n<=count;n++){
   await page.evaluate(n=>location.hash=String(n),n);await page.waitForTimeout(100);
   const result=await page.locator(`section[id="${n}"]`).evaluate(s=>{
    const rect=s.getBoundingClientRect();const scale=rect.height/720;
    const content=[...s.children].filter(e=>!['FOOTER','HEADER'].includes(e.tagName));
    const issues=content.flatMap(e=>{
     const r=e.getBoundingClientRect();const top=(r.top-rect.top)/scale;const bottom=(r.bottom-rect.top)/scale;
     const outside= r.left < rect.left+48*scale || r.right > rect.right-36*scale;
     return top<52||bottom>655||outside?[{tag:e.tagName,top,bottom,outside,text:e.textContent.slice(0,100)}]:[];
    });
    return {title:s.querySelector('h2')?.textContent,issues,fonts:document.fonts.check('28px Sora')&&document.fonts.check('28px "Plus Jakarta Sans"'),broken:[...s.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)};
   });
   await page.screenshot({path:path.join(dir,`${session.id}-${String(n).padStart(3,'0')}.png`),animations:'disabled'});
   report.push({session:session.id,slide:n,...result});
  }
  console.log(`${session.id}: ${count} diapositives renderitzades`);
 }
 const diagrams=[];
 for(const file of fs.readdirSync(path.join(root,'formacio/diagrames')).filter(f=>f.endsWith('.svg')&&!f.startsWith('programa-'))){
  await page.setViewportSize({width:1120,height:350});
  await page.goto(pathToFileURL(path.join(root,'formacio/diagrames',file)).href);
  await page.evaluate(()=>document.fonts.ready);
  const issues=await page.evaluate(()=>[...document.querySelectorAll('text')].flatMap(e=>{
   const b=e.getBBox();
   return b.x<0||b.y<0||b.x+b.width>1120||b.y+b.height>350?[{text:e.textContent,x:b.x,y:b.y,width:b.width,height:b.height}]:[];
  }));
  await page.screenshot({path:path.join(dir,'diagram-'+file+'.png')});
  diagrams.push({file,issues});
 }
 fs.writeFileSync(path.join(dir,'diagram-report.json'),JSON.stringify(diagrams,null,2));
 const diagramFailures=diagrams.filter(d=>d.issues.length);
 console.log(`${diagrams.length} diagrames explicatius; ${diagramFailures.length} amb etiquetes fora dels límits.`);
 if(diagramFailures.length){for(const d of diagramFailures)console.log(JSON.stringify(d));process.exitCode=1;}
 fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2));
 const failed=report.filter(r=>r.issues.length||r.broken.length||!r.fonts);
 console.log(`${report.length} diapositives; ${failed.length} incidències de composició, fonts o imatges.`);
 for(const f of failed)console.log(JSON.stringify(f));
 if(failed.length)process.exitCode=1;
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
