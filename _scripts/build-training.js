#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const renderer = require('./lib/markdown');
const {getCachedMakeCodeSVG,warmMakeCodeCache} = require('./lib/makecode-cache');
const {createHash} = require('node:crypto');
const {buildTrainingDiagrams} = require('./lib/training-diagrams');
const {trainingGuide} = require('./lib/training-guide');
async function main(){
const root = path.resolve(__dirname, '..');
const training = path.join(root, 'formacio');
const htmlDir = path.join(training, 'html');
const reviewDir = path.join(training, '.revisio');
const pdfDir = path.join(training, 'export');
const pdf = process.argv.includes('--pdf');
if(process.argv.slice(2).some(a => !['--pdf','--warm-makecode'].includes(a))) throw Error('Ús: node _scripts/build-training.js [--pdf] [--warm-makecode]');
for (const dir of [htmlDir, reviewDir, path.join(training,'diagrames')]) fs.mkdirSync(dir,{recursive:true});
let cli;
try { cli = require.resolve('@marp-team/marp-cli/marp-cli.js', {paths:[training]}); }
catch { throw Error('Instal·la Marp: npm --prefix formacio ci'); }
// The Markdown fences are the sole source of the programs. Use the exact site
// Markdown -> semantic HTML pipeline, including dialects and MakeCode cache.
const sessions = JSON.parse(fs.readFileSync(path.join(training,'sessions.json'),'utf8'));
const fencePattern = /^```(makecode|mblock|spikeapp|talebot|tale-bot|coding-set|codingset)\s*\n([\s\S]*?)^```[ \t]*$/gm;
const codes = new Map();
for(const session of sessions){
 const source=fs.readFileSync(path.join(training,'presentacions',session.id+'.md'),'utf8');
 for(const match of source.matchAll(fencePattern)) if(match[1]==='makecode')codes.set(match[2].trim(),true);
}
if(process.argv.includes('--warm-makecode')) await warmMakeCodeCache([...codes.keys()]);
for(const code of codes.keys()) if(!getCachedMakeCodeSVG(code))throw Error('Falta un programa MakeCode en la memòria cau. Genera’l una vegada amb --warm-makecode (necessita connexió).');
const blockManifest=[];
function renderProgrammingFence(match,lang,code){
 const fence='```'+lang+'\n'+code.trim()+'\n```';
 const html=renderer.parse(fence).html;
 const start=html.indexOf('<svg');const end=html.lastIndexOf('</svg>');
 if(start<0||end<start)throw Error('El renderitzador del web no ha generat SVG: '+lang);
 const svg=html.slice(start,end+6);
 const hash=createHash('sha256').update(lang+'\n'+code.trim()).digest('hex').slice(0,16);
 const filename='programa-'+lang+'-'+hash+'.svg';
 fs.writeFileSync(path.join(training,'diagrames',filename),svg);
 if(!blockManifest.some(p=>p.filename===filename))blockManifest.push({lang,code:code.trim(),filename});
 return `![w:1000](../diagrames/${filename})`;
}
buildTrainingDiagrams(path.join(training,'diagrames'), training);
let theme = fs.readFileSync(path.join(training,'tema.css'),'utf8');
for (const font of ['Sora','PlusJakartaSans']) theme = theme.replace(`fonts/${font}.ttf`, `data:font/ttf;base64,${fs.readFileSync(path.join(training,'fonts',font+'.ttf')).toString('base64')}`);
theme = theme.replace('../_assets/icons/logo.svg', `data:image/svg+xml;base64,${fs.readFileSync(path.join(root,'_assets/icons/logo.svg')).toString('base64')}`);
const themePath = path.join(reviewDir,'robotica.css');
fs.writeFileSync(themePath, theme);
const {Marp}=require(require.resolve('@marp-team/marp-core',{paths:[training]}));
const notesEngine=new Marp({html:true});notesEngine.themeSet.add(theme);
for (const session of sessions) {
 const original = fs.readFileSync(path.join(training,'presentacions',session.id+'.md'),'utf8');
 const source = path.join(reviewDir,session.id+'.md');
 const staged=original.replace(fencePattern,renderProgrammingFence);
 fs.writeFileSync(source,staged);
 const {comments}=notesEngine.render(staged);
 fs.writeFileSync(path.join(htmlDir,session.id+'-guio.html'),trainingGuide(session,staged,comments));
 const result = spawnSync(process.execPath,[cli,source,'--theme-set',themePath,'--html','--output',path.join(htmlDir,session.id+'.html')],{cwd:root,encoding:'utf8'});
 if(result.status!==0) throw Error(result.stderr || result.stdout);
 console.log(`✓ ${session.id}: HTML Marp`);
 if(pdf) {
  fs.mkdirSync(pdfDir,{recursive:true});
  const resultPDF = spawnSync(process.execPath,[cli,source,'--theme-set',themePath,'--html','--pdf','--allow-local-files','--output',path.join(pdfDir,session.id+'.pdf')],{cwd:root,encoding:'utf8',env:{...process.env,CHROME_PATH:process.env.CHROME_PATH || '/usr/bin/google-chrome'}});
  if(resultPDF.status!==0) throw Error(resultPDF.stderr || resultPDF.stdout);
  console.log(`✓ ${session.id}: PDF`);
 }
}
const currentPrograms = new Set(blockManifest.map(program=>program.filename));
for(const file of fs.readdirSync(path.join(training,'diagrames'))){
 if(file.startsWith('programa-') && file.endsWith('.svg') && !currentPrograms.has(file))fs.unlinkSync(path.join(training,'diagrames',file));
}
fs.writeFileSync(path.join(reviewDir,'programs.json'),JSON.stringify(blockManifest,null,2));
const escape = s => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const card = s => `<li><p>${escape(s.label)}</p><h3>${escape(s.title)}</h3><p>${s.slideCount} transparències · 120 minuts</p><a href="${s.id}.html">Obrir presentació →</a> · <a href="${s.id}-guio.html">Guió de la sessió</a>${pdf ? ` · <a href="../export/${s.id}.pdf">PDF</a>` : ''}</li>`;
fs.writeFileSync(path.join(htmlDir,'index.html'),`<!doctype html><html lang="ca"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Formació presencial · Robòtica per a docents</title><style>@font-face{font-family:Sora;src:url('../fonts/Sora.ttf')}@font-face{font-family:Jakarta;src:url('../fonts/PlusJakartaSans.ttf')}*{box-sizing:border-box}body{margin:0;background:#f8fafc;color:#0f172a;font:18px/1.6 Jakarta,sans-serif}header,main{max-width:1100px;margin:auto;padding:48px 36px}header{background:#ebf5fd}h1,h2,h3{font-family:Sora,sans-serif;line-height:1.25}h1{font-size:42px}header img{width:54px}h2{margin-top:40px}ul{padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}li{background:white;border:1px solid #e5e9ee;padding:24px;border-radius:16px}li p{color:#64748b;font-size:15px}a{color:#1d4ed8}a:focus-visible{outline:3px solid #2563eb;outline-offset:4px}</style><header><img src="../../_assets/icons/logo.svg" alt=""><p>Robòtica per a docents</p><h1>Formació presencial</h1><p>Dos itineraris per començar amb la dotació d’aula. Sessions de dues hores que es poden seguir amb projector.</p></header><main><h2>Primera sessió compartida</h2><ul>${card(sessions[0])}</ul><h2>Format de 3 sessions · 6 hores</h2><p>Continueu amb aquestes dues sessions després de la primera.</p><ul>${sessions.filter(s=>s.id.includes('format3')).map(card).join('')}</ul><h2>Format de 4 sessions · 8 hores</h2><p>Continueu amb aquestes tres sessions després de la primera.</p><ul>${sessions.filter(s=>s.id.includes('format4')).map(card).join('')}</ul><p>Navegueu amb les fletxes. Utilitzeu els controls de Marp per a pantalla completa i mode de presentació. Les imatges són il·lustracions dels recursos del projecte.</p></main></html>`);

}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
