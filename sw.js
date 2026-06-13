const CACHE = "banana-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/main.js",
  "js/scenes/scene-taxi.js",
  "js/scenes/scene-lobby.js",
  "js/scenes/scene-elevator.js",
  "js/scenes/scene-chaos.js",
  "js/scenes/scene-office.js",
  "https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.filter(a => !a.startsWith("http")))));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      }).catch(() => cached))
  );
});
