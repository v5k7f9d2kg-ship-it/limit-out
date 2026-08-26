/* Service worker — this is what makes the game work with no signal.

   Everything is cached on install, so after the first visit the game opens
   instantly and runs on a plane, in a car, or on a school wifi that blocks
   half the internet. Testers won't hit a blank page.

   Bump CACHE when you deploy a new build, or phones will keep serving the
   old one from cache. That's the single most common PWA mistake. */

const CACHE = "limit-out-v11";

const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network first, cache as the fallback. That way a redeploy reaches players
   as soon as they have signal, while offline still works.

   Cross-origin requests (PostHog analytics) are left alone entirely — we
   only want to cache-and-serve our own game files, not proxy or cache
   third-party calls, and analytics failing offline should just fail
   quietly rather than get handed a fallback page. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
