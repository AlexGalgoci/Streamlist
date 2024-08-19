/* eslint-disable no-restricted-globals */

// Import the Workbox library for precaching and routing
import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache and route assets generated by Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching: Cache API responses and serve them from the cache
registerRoute(
  ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  new CacheFirst({
    cacheName: 'streamlist-runtime-cache-v1',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Cache up to 50 items
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);

/* eslint-enable no-restricted-globals */
