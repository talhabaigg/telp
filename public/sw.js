"use strict";

/**
 * List of files to cache during service worker installation.
 * @type {string[]}
 */
const filesToCache = [

    "/",
    "/offline.html"
];

/**
 * Preload the cache with the files in `filesToCache`.
 * @returns {Promise} Resolves when the files have been added to cache.
 */
const preLoad = function () {
    return caches.open ("offline").then (function (cache) {
        return cache.addAll (filesToCache);
    });
};

/**
 * Check if the request can be fulfilled by the network.
 * @param {Request} request The request to be fetched.
 * @returns {Promise<Response>} Resolves with the response if successful, or rejects if not.
 */
const checkResponse = function (request) {
    return new Promise (function (fulfill, reject) {
        fetch (request).then (function (response) {
            if (response.status !== 404) {
                fulfill (response);
            } else {
                reject ();
            }
        }, reject);
    });
};

/**
 * Add the given request to the cache.
 * @param {Request} request The request to be cached.
 * @returns {Promise<void>} Resolves when the request has been added to the cache.
 */
const addToCache = function (request) {
    return caches.open ("offline").then (function (cache) {
        return fetch (request).then (function (response) {
            return cache.put (request, response);
        });
    });
};

/**
 * Remove the given request from the cache.
 * @param {Request} request The request to be removed from the cache.
 * @returns {Promise<void>} Resolves when the request has been removed from the cache.
 */
const removeFromCache = function (request) {
    return caches.open ("offline").then (function (cache) {
        return cache.delete (request);
    });
};

/**
 * Try to fetch the response from cache.
 * @param {Request} request The request to be fetched from cache.
 * @returns {Promise<Response>} Resolves with the cached response or fallback to offline.html.
 */
const returnFromCache = function (request) {
    return caches.open ("offline").then (function (cache) {
        return cache.match (request).then (function (matching) {
            if (! matching || matching.status === 404) {
                return cache.match ("offline.html");
            } else {
                return matching;
            }
        });
    });
};

/**
 * Install event handler to preload files into cache.
 * @param {ExtendableEvent} event The install event.
 * @returns {void}
 */
self.addEventListener ("install", function (eventListener) {
    eventListener.waitUntil (preLoad ());
});

/**
 * Fetch event handler to handle requests and serve from cache or network.
 * @param {FetchEvent} event The fetch event.
 * @returns {void}
 */
self.addEventListener ("fetch", function (eventListener) {
    eventListener.respondWith (checkResponse (eventListener.request).catch (function () {
        return returnFromCache (eventListener.request);
    }));
    if (! eventListener.request.url.startsWith ("http")) {
        eventListener.waitUntil (addToCache (eventListener.request));
    }
});

/**
 * Apply ProgressWebApp ServiceWorker.
 */
if (! navigator.serviceWorker.controller) navigator.serviceWorker.register ("/sw.js").then (function (registration) {});
