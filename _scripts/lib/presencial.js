'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const ITERATIONS=600000;
function sourceDigest(root){
 const hash=crypto.createHash('sha256');
 function add(file){const stat=fs.statSync(file);if(stat.isDirectory()){for(const name of fs.readdirSync(file).sort())if(name!=='__pycache__'&&name!=='presencial.js')add(path.join(file,name))}else{hash.update(path.relative(root,file));hash.update(fs.readFileSync(file))}}
 for(const name of ['formacio/presentacions','formacio/fonts','formacio/tema.css','formacio/sessions.json','_scripts/build-training.js','_scripts/lib','_templates/components/code-panel.js','_templates/layout/utils.js','_assets','_cache/makecode']){
  const file=path.join(root,name);if(fs.existsSync(file))add(file);
 }
 return hash.digest('hex');
}
function encrypt(bytes,key,salt,id,mime,filename){
 const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',key,iv);cipher.setAAD(Buffer.from(JSON.stringify([1,id,mime,filename])));
 const data=Buffer.concat([cipher.update(bytes),cipher.final(),cipher.getAuthTag()]);
 return {version:1,id,mime,filename,iterations:ITERATIONS,salt:salt.toString('base64'),iv:iv.toString('base64'),data:data.toString('base64')};
}
function decrypt(payload,password){
 if(payload.version!==1||payload.iterations!==ITERATIONS)throw Error('Format de memòria cau desconegut');
 const salt=Buffer.from(payload.salt,'base64');
 const key=crypto.pbkdf2Sync(password,salt,ITERATIONS,32,'sha256');
 try{
  const data=Buffer.from(payload.data,'base64');
  const decipher=crypto.createDecipheriv('aes-256-gcm',key,Buffer.from(payload.iv,'base64'));
  decipher.setAAD(Buffer.from(JSON.stringify([payload.version,payload.id,payload.mime,payload.filename])));decipher.setAuthTag(data.subarray(-16));
  return Buffer.concat([decipher.update(data.subarray(0,-16)),decipher.final()]);
 }finally{key.fill(0)}
}
function prepareHTML(source,training,sessions){
 let html=source.replace(/\.\.\/\.\.\/_assets\//g,'../_assets/').replace(/\.\.\/fonts\//g,'fonts/');
 html=html.replace(/\.\.\/diagrames\/([^"'<>\s)]+)/g,(_,name)=>{
  const file=path.resolve(training,'diagrames',decodeURIComponent(name));
  if(path.dirname(file)!==path.join(training,'diagrames'))throw Error('Ruta de diagrama no vàlida');
  return 'data:image/svg+xml;base64,'+fs.readFileSync(file).toString('base64');
 });
 for(const s of sessions){
  html=html.replaceAll('../export/'+s.id+'.pdf',s.id+'-pdf.html');
  // The HTML-only regeneration may omit PDF links; publication has verified PDFs.
  const anchor=`href="${s.id}.html">Obrir presentació →</a>`;
  if(html.includes(anchor)&&!html.includes(`href="${s.id}-pdf.html"`))html=html.replace(anchor,anchor+` · <a href="${s.id}-pdf.html">PDF</a>`);
 }
 const meta='<meta name="robots" content="noindex,nofollow,noarchive">';
 return html.includes('</head>')?html.replace('</head>',meta+'</head>'):html.replace(/<html[^>]*>/i,tag=>tag+meta);
}
function publishPresencial({root,dist,password,compile=true}){
 const training=path.join(root,'formacio');
 const output=path.join(dist,'presencial');
 const template=fs.readFileSync(path.join(root,'_templates/presencial/access.html'),'utf8');
 // Always replace the publication tree, including files left by earlier versions.
 fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
 for(const file of ['access.js','access.css'])fs.copyFileSync(path.join(root,'_templates/presencial',file),path.join(output,file));
 fs.cpSync(path.join(training,'fonts'),path.join(output,'fonts'),{recursive:true});
 if(!password){fs.writeFileSync(path.join(output,'index.html'),template.replace('{{PAYLOAD}}',''));return {enabled:false,count:0}}
 if(password.length<12)throw Error('PRESENCIAL_PASSWORD ha de tindre almenys 12 caràcters.');
 const sessions=JSON.parse(fs.readFileSync(path.join(training,'sessions.json'),'utf8'));
 const digest=sourceDigest(root);const stamp=path.join(root,'.cache/presencial-pdfs.sha256');
 let reusable=fs.existsSync(stamp)&&fs.readFileSync(stamp,'utf8').trim()===digest&&sessions.every(s=>fs.existsSync(path.join(training,'export',s.id+'.pdf')));
 const encryptedCache=path.join(root,'.cache/presencial-encrypted-pdfs');
 if(!reusable&&fs.existsSync(path.join(encryptedCache,'manifest.json'))){
  try{
   const cached=JSON.parse(fs.readFileSync(path.join(encryptedCache,'manifest.json'),'utf8'));
   if(cached.digest===digest){
    const restored=sessions.map(session=>{
     const file=session.id+'-pdf.enc.json';const payload=JSON.parse(fs.readFileSync(path.join(encryptedCache,file),'utf8'));
     if(payload.id!==session.id+'-pdf'||payload.mime!=='application/pdf')throw Error('PDF no vàlid en memòria cau');
     const bytes=decrypt(payload,password);if(bytes.subarray(0,5).toString()!=='%PDF-')throw Error('PDF no vàlid');
     return {file:session.id+'.pdf',bytes};
    });
    fs.mkdirSync(path.join(training,'export'),{recursive:true});
    for(const item of restored)fs.writeFileSync(path.join(training,'export',item.file),item.bytes);
    reusable=true;
   }
  }catch{ /* A changed password or invalid cache requires fresh PDF generation. */ }
 }
 if(compile){
  const args=[path.join(root,'_scripts/build-training.js')];if(!reusable)args.push('--pdf');
  const trainingEnv={...process.env};delete trainingEnv.PRESENCIAL_PASSWORD;
  const result=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit',env:trainingEnv});if(result.status!==0)throw Error('No s’ha pogut generar la formació presencial.');
  fs.mkdirSync(path.dirname(stamp),{recursive:true});fs.writeFileSync(stamp,digest+'\n');
 }
 const salt=crypto.randomBytes(16);const key=crypto.pbkdf2Sync(password,salt,ITERATIONS,32,'sha256');
 let count=0;
 function write(id,bytes,mime,filename){
  const payload=id+'.enc.json';
  fs.writeFileSync(path.join(output,payload),JSON.stringify(encrypt(bytes,key,salt,id,mime,filename)));
  fs.writeFileSync(path.join(output,id+'.html'),template.replace('{{PAYLOAD}}',payload));count++;
 }
 for(const id of ['index',...sessions.flatMap(s=>[s.id,s.id+'-guio'])]){
  const html=prepareHTML(fs.readFileSync(path.join(training,'html',id+'.html'),'utf8'),training,sessions);
  write(id,Buffer.from(html),'text/html',id+'.html');
 }
 fs.rmSync(encryptedCache,{recursive:true,force:true});fs.mkdirSync(encryptedCache,{recursive:true});
 for(const s of sessions){
  write(s.id+'-pdf',fs.readFileSync(path.join(training,'export',s.id+'.pdf')),'application/pdf',s.id+'.pdf');
  const filename=s.id+'-pdf.enc.json';fs.copyFileSync(path.join(output,filename),path.join(encryptedCache,filename));
 }
 fs.writeFileSync(path.join(encryptedCache,'manifest.json'),JSON.stringify({digest}));
 key.fill(0);
 return {enabled:true,count,reusedPDFs:reusable};
}
function configuredPassword(root){
 if(process.env.PRESENCIAL_PASSWORD)return process.env.PRESENCIAL_PASSWORD;
 const file=path.join(root,'formacio/.presencial-password');
 return fs.existsSync(file)?fs.readFileSync(file,'utf8').trim():'';
}
module.exports={publishPresencial,configuredPassword,prepareHTML,encrypt,decrypt,sourceDigest,ITERATIONS};
