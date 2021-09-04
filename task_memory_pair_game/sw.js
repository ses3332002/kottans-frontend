const staticCacheName = 'static-cache-v3';
const dynamicCacheName = 'dynamic-cache-v3';

const staticAssets = [
  './',
  './index.html',
  './icon.png',
  './apple-touch-icon.png',
  './style.css',
  './script.js',
  './fonts/Bellota-Regular.woff2',
  './fonts/helveticaneuecyr-light-webfont.woff2',
  './img/icons_sprite.svg',
  './img/1_1.jpg',
  './img/1_2.jpg',
  './img/1_3.jpg',
  './img/1_4.jpg',
  './img/1_5.jpg',
  './img/1_6.jpg',
  './img/1_7.jpg',
  './img/1_8.jpg',
  './img/1_9.jpg',
  './img/1_10.jpg',
  './img/1_11.jpg',
  './img/1_12.jpg',
  './img/1_bg.jpg',
  './img/2_1.jpg',
  './img/2_2.jpg',
  './img/2_3.jpg',
  './img/2_4.jpg',
  './img/2_5.jpg',
  './img/2_6.jpg',
  './img/2_7.jpg',
  './img/2_8.jpg',
  './img/2_9.jpg',
  './img/2_10.jpg',
  './img/2_11.jpg',
  './img/2_12.jpg',
  './img/2_bg.jpg',
  './img/no-image.jpg',
];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('activate', async (event) => {
  const cachesKeys = await caches.keys();
  const checkKeys = cachesKeys.map(async (key) => {
    if (![staticCacheName, dynamicCacheName].includes(key)) {
      await caches.delete(key);
    }
  });
  await Promise.all(checkKeys);
});

self.addEventListener('fetch', (event) => {
  event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedRes = await cache.match(req);
    if (cachedRes) {
      return cachedRes;
    } else if (req.url.indexOf('.html') !== -1) {
      return caches.match('./offline.html');
    } else {
      return caches.match('./img/no-image.jpg');
    }
  }
}
