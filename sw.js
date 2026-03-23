/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5a5d9309'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "43ef5aaac28c91da4a220a105c42694a"
  }, {
    "url": "icon.png",
    "revision": "c0f879f23e8ee62790a48436d4cc49b0"
  }, {
    "url": "icon-512.png",
    "revision": "a458c0877eca78ec1e38ce30b18f8ba0"
  }, {
    "url": "icon-192.png",
    "revision": "af8956e8a2fe08991abc88a506be34e6"
  }, {
    "url": "favicon.ico",
    "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
  }, {
    "url": "workers/updateWorker.js",
    "revision": "408b41a64df79a5d88cff7a96ec346c8"
  }, {
    "url": "images/bg.png",
    "revision": "6ebe78cb765815fdc628c5620ed0c6ac"
  }, {
    "url": "images/bg.avif",
    "revision": "d56dedb2f6cb387aacc6f0aea1b63a8a"
  }, {
    "url": "assets/workbox-window.prod.es5-d772c227.js",
    "revision": null
  }, {
    "url": "assets/index-c536456f.css",
    "revision": null
  }, {
    "url": "assets/index-8c60c579.js",
    "revision": null
  }, {
    "url": "assets/TestView-cdb07054.js",
    "revision": null
  }, {
    "url": "assets/TestView-64c3cae9.css",
    "revision": null
  }, {
    "url": "assets/RepoView-dc398224.js",
    "revision": null
  }, {
    "url": "assets/OneView-db92cedb.css",
    "revision": null
  }, {
    "url": "assets/OneView-78899149.js",
    "revision": null
  }, {
    "url": "assets/ListView-8ac98f4c.js",
    "revision": null
  }, {
    "url": "assets/ImportView-fee03e52.js",
    "revision": null
  }, {
    "url": "assets/ImportView-0b54aaa6.css",
    "revision": null
  }, {
    "url": "assets/ConfigView-5f06256a.css",
    "revision": null
  }, {
    "url": "assets/ConfigView-43420b53.js",
    "revision": null
  }, {
    "url": "manifest.webmanifest",
    "revision": "5bd53351bd82ba40792f278a9cba4322"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/cards3/index.html"), {
    denylist: [/^\/cards3\/repo\//]
  }));

}));
