!function(){"use strict";const t=1633448136346,e=`cache${t}`,n=["/client/client.f3814d5a.js","/client/inject_styles.5607aec6.js","/client/index.1fff9ff2.js","/client/about.f8b7d55b.js"].concat(["/service-worker-index.html","/favicon.png","/logo-192.png","/logo-512.png","/manifest.json","/og-img-t.png"]),s=new Set(n);self.addEventListener("install",(t=>{t.waitUntil(caches.open(e).then((t=>t.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(t=>{t.waitUntil(caches.keys().then((async t=>{for(const n of t)n!==e&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const n=new URL(e.request.url),a=n.protocol.startsWith("http"),c=n.hostname===self.location.hostname&&n.port!==self.location.port,i=n.host===self.location.host&&s.has(n.pathname),o="only-if-cached"===e.request.cache&&!i;!a||c||o||e.respondWith((async()=>i&&await caches.match(e.request)||async function(e){const n=await caches.open(`offline${t}`);try{const t=await fetch(e);return n.put(e,t.clone()),t}catch(t){const s=await n.match(e);if(s)return s;throw t}}(e.request))())}))}();
