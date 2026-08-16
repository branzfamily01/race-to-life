const CACHE='race-to-life-v1.1';
const ASSETS=['./','./index.html','./styles.css','./app-core.js','./app-views.js','./app-runtime.js','./app-audio.js','./app-clean-music.js','./app-race.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(caches.match(e.request).then(async r=>{
  if(r)return r;
  try{let net=await fetch(e.request);let copy=net.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return net}catch{return Response.error()}
 }));
});
