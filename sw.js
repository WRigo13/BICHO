const CACHE='jogo-bicho-v4';
// Detecta se está em subpasta /BICHO/
const BASE=self.registration.scope.includes('/BICHO')?'/BICHO':'';
const ARQUIVOS=[BASE+'/',BASE+'/index.html',BASE+'/manifest.json'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ARQUIVOS).catch(()=>{}))
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const network=fetch(e.request).then(res=>{
        if(res&&res.status===200){
          caches.open(CACHE).then(c=>c.put(e.request,res.clone()));
        }
        return res;
      }).catch(()=>cached);
      return cached||network;
    })
  );
});
