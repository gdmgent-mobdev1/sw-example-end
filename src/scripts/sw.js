/* eslint-disable no-restricted-globals */

// Set the debug state
const DEBUG = false;

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
const { assets } = global.serviceWorkerOption;

// The current cache version
const CACHE_NAME = 'v31';

// The cache assets
let assetsToCache = [...assets, './'];
assetsToCache = assetsToCache.map((path) => new URL(path, global.location).toString());

/**
 * When Service Worker is installed
 */
self.addEventListener('install', (e) => {
  if (DEBUG) console.log('[Serviceworker] installed.');

  // This caches the files in the installer, on before
  e.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.addAll(assetsToCache);
      })
      .then(() => {
        if (DEBUG) console.log('Cached assets: main', assetsToCache);
      })
      .catch((error) => {
        console.error(error);
      }),
  );
});

/**
 * When Service Worker is active
 * After the install event
 */
self.addEventListener('activate', (e) => {
  if (DEBUG) console.log(`[Serviceworker] ${CACHE_NAME} is active & ready to handle fetches!`);

  // Clean the caches
  e.waitUntil(
    global.caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        // Delete the caches that are not the current one.
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null;
        }
        return global.caches.delete(cacheName);
      }),
    )),
  );
});

/**
 * When the Fetch event is triggered
 */
self.addEventListener('fetch', (e) => {
  if (DEBUG) console.log('[ServiceWorker] Fetching', e.request.url);
  e.respondWith(
    // If the fetch fails (because of offlinelessness), return the cached version
    fetch(e.request).catch(() => caches.match(e.request)),
  );
});
