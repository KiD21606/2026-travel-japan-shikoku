const CACHE_NAME = 'shikoku-v1';
// 列出所有出國要用的檔案清單
const ASSETS = [
  'shikoku.html',
  'manifest.json',
  'images/0309.png',
  'images/0310.png',
  'images/0311.png',
  'images/0312.png',
  'images/0313.png',
  'images/0314.png',
  'images/0315.png',
  'images/0316.png',
  'images/0317.png',
  'images/0318.png',
  'images/app-icon.png',
];

// 1. 安裝：把清單中的檔案通通下載到手機快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. 攔截：當網頁要圖或要頁面時，優先從快取拿，不走網路
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});