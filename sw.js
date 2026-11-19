const C = 'metodex-apps-v7';
const ARQ = ['./', './index.html', './tatico.html', './gestor.html', './operacional.html', './manifest.webmanifest', './manifest-tatico.webmanifest', './manifest-gestor.webmanifest', './manifest-operacional.webmanifest',
  './assets/icone_192.png', './assets/icone_512.png', './assets/icone_tat_192.png', './assets/icone_tat_512.png', './assets/icone_ges_192.png', './assets/icone_ges_512.png', './assets/icone_ope_192.png', './assets/icone_ope_512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => Promise.all(ARQ.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request, {ignoreSearch: true}).then(m => m || caches.match('./index.html'))));
});
