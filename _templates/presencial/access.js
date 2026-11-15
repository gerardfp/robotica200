'use strict';
(async()=>{
 const payloadName=document.body.dataset.payload;
 const base=new URL('.',location.href);
 const storageName='robotica-presencial:'+base.pathname;
 const form=document.querySelector('#access-form');
 const status=document.querySelector('#access-status');
 const input=document.querySelector('#password');
 const button=form.querySelector('button');
 form.addEventListener('submit',event=>event.preventDefault());
 let payload;
 let objectURL;
 const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 const encode=a=>btoa(String.fromCharCode(...a));
 const get=()=>{try{return JSON.parse(sessionStorage.getItem(storageName))}catch{return null}};
 const clear=()=>{try{sessionStorage.removeItem(storageName)}catch{}};
 window.__presencialLogout=()=>{clear();if(objectURL)URL.revokeObjectURL(objectURL);location.replace(base.href)};
 window.addEventListener('pageshow',event=>{if(event.persisted&&!get())location.reload()});
 if(!payloadName){form.hidden=true;status.textContent='Aquests materials encara no estan disponibles.';return}
 if(!window.crypto?.subtle){form.hidden=true;status.textContent='Obriu aquesta pàgina amb HTTPS o des del servidor local.';return}
 function toolbar(){
  const bar=document.createElement('nav');bar.id='presencial-controls';bar.setAttribute('aria-label','Formació presencial');
  bar.style.cssText='position:fixed;top:10px;right:14px;z-index:100000;display:flex;align-items:center;gap:14px;padding:8px 12px;background:#ffffffed;border:1px solid #dbe5ef;border-radius:10px;font:14px "Plus Jakarta Sans",Jakarta,sans-serif';
  const home=document.createElement('a');home.href=base.href;home.textContent='Materials';home.style.color='#1d4ed8';
  const logout=document.createElement('button');logout.textContent='Tancar sessió';logout.onclick=window.__presencialLogout;logout.style.cssText='font:inherit;padding:6px 10px;border:0;border-radius:6px;background:#eff6ff;color:#1d4ed8;cursor:pointer';
  bar.append(home,logout);document.body.append(bar);window.addEventListener('pageshow',event=>{if(event.persisted&&!get())location.reload()});
 }
 async function open(raw){
  const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
  const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(payload.iv),additionalData:new TextEncoder().encode(JSON.stringify([payload.version,payload.id,payload.mime,payload.filename]))},key,decode(payload.data));
  try{sessionStorage.setItem(storageName,JSON.stringify({salt:payload.salt,key:encode(raw)}))}catch{}
  if(payload.mime==='text/html'){
   const html=new TextDecoder().decode(plain);
   document.open();document.write(html);document.close();toolbar();
  }else if(payload.mime==='application/pdf'){
   objectURL=URL.createObjectURL(new Blob([plain],{type:'application/pdf'}));
   document.title='PDF · Formació presencial';document.body.className='pdf-page';document.body.replaceChildren();
   const actions=document.createElement('p');actions.className='pdf-actions';
   const download=document.createElement('a');download.href=objectURL;download.download=payload.filename;download.textContent='Descarrega el PDF';
   const direct=document.createElement('a');direct.href=objectURL;direct.target='_blank';direct.rel='noopener';direct.textContent='Obri el PDF en una altra pestanya';
   actions.append(download,document.createTextNode(' · '),direct);
   const frame=document.createElement('iframe');frame.src=objectURL;frame.title='Presentació en PDF';frame.className='pdf-viewer';
   document.body.append(actions,frame);toolbar();
  }else throw Error('Format no admés');
 }
 try{const response=await fetch(new URL(payloadName,base));if(!response.ok)throw Error();payload=await response.json()}
 catch{form.hidden=true;status.textContent='No s’han pogut carregar els materials. Torneu-ho a provar.';return}
 const previous=get();
 if(previous?.salt===payload.salt){try{await open(decode(previous.key));return}catch{clear()}}
 form.addEventListener('submit',async event=>{
  event.preventDefault();button.disabled=true;status.textContent='Obrint els materials…';
  try{
   const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(input.value),'PBKDF2',false,['deriveBits']);
   const raw=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:decode(payload.salt),iterations:payload.iterations,hash:'SHA-256'},material,256));
   input.value='';await open(raw);
  }catch{clear();status.textContent='Contrasenya incorrecta o materials no disponibles. Torneu-ho a provar.';input.focus();input.select();button.disabled=false}
 });
 input.disabled=false;button.disabled=false;
})();
