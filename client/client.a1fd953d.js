function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e,n,r){if(t){const o=a(t,e,n,r);return t[0](o)}}function a(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function l(t,e,n,r,o,s,c){const i=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,s);if(i){const o=a(e,n,r,c);t.p(o,i)}}function u(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function $(){return m("")}function y(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function v(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return Array.from(t.childNodes)}function _(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;const s=[];for(;e<o.attributes.length;){const t=o.attributes[e++];n[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):h(e)}function x(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return m(e)}function E(t){return x(t," ")}function w(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function S(t,e=document.body){return Array.from(e.querySelectorAll(t))}let N;function R(t){N=t}function P(){if(!N)throw new Error("Function called outside component initialization");return N}const A=[],L=[],j=[],k=[],O=Promise.resolve();let C=!1;function q(t){j.push(t)}let T=!1;const U=new Set;function I(){if(!T){T=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];R(e),B(e.$$)}for(R(null),A.length=0;L.length;)L.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];U.has(e)||(U.add(e),e())}j.length=0}while(A.length);for(;k.length;)k.pop()();C=!1,T=!1,U.clear()}}function B(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const J=new Set;let z;function K(){z={r:0,c:[],p:z}}function M(){z.r||o(z.c),z=z.p}function V(t,e){t&&t.i&&(J.delete(t),t.i(e))}function D(t,e,n,r){if(t&&t.o){if(J.has(t))return;J.add(t),z.c.push((()=>{J.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function H(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const c=t[s],i=e[s];if(i){for(const t in c)t in i||(r[t]=1);for(const t in i)o[t]||(n[t]=i[t],o[t]=1);t[s]=i}else for(const t in c)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function Y(t){return"object"==typeof t&&null!==t?t:{}}function F(t){t&&t.c()}function G(t,e){t&&t.l(e)}function W(t,e,r){const{fragment:c,on_mount:i,on_destroy:a,after_update:l}=t.$$;c&&c.m(e,r),q((()=>{const e=i.map(n).filter(s);a?a.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(q)}function X(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(A.push(t),C||(C=!0,O.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Z(e,n,s,c,i,a,l=[-1]){const u=N;R(e);const f=n.props||{},d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l,skip_bound:!1};let h=!1;if(d.ctx=s?s(e,f,((t,n,...r)=>{const o=r.length?r[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),h&&Q(e,t)),n})):[],d.update(),h=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),n.target){if(n.hydrate){const t=b(n.target);d.fragment&&d.fragment.l(t),t.forEach(p)}else d.fragment&&d.fragment.c();n.intro&&V(e.$$.fragment),W(e,n.target,n.anchor),I()}R(u)}class tt{$destroy(){X(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const et=[];function nt(e,n=t){let r;const o=[];function s(t){if(c(e,t)&&(e=t,r)){const t=!et.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),et.push(n,e)}if(t){for(let t=0;t<et.length;t+=2)et[t][0](et[t+1]);et.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const a=[c,i];return o.push(a),1===o.length&&(r=n(s)||t),c(e),()=>{const t=o.indexOf(a);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const rt={},ot=t=>({segment:1&t}),st=t=>({segment:t[0]});function ct(t){let e,n;const r=t[2].default,o=i(r,t,t[1],st);return{c(){e=h("main"),o&&o.c()},l(t){e=_(t,"MAIN",{});var n=b(e);o&&o.l(n),n.forEach(p)},m(t,r){f(t,e,r),o&&o.m(e,null),n=!0},p(t,[e]){o&&o.p&&3&e&&l(o,r,t,t[1],e,ot,st)},i(t){n||(V(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function it(t,e,n){let{$$slots:r={},$$scope:o}=e,{segment:s}=e;return t.$$set=t=>{"segment"in t&&n(0,s=t.segment),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class at extends tt{constructor(t){super(),Z(this,t,it,ct,c,{segment:0})}}function lt(t){let e,n,r=t[1].stack+"";return{c(){e=h("pre"),n=m(r)},l(t){e=_(t,"PRE",{});var o=b(e);n=x(o,r),o.forEach(p)},m(t,r){f(t,e,r),u(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&w(n,r)},d(t){t&&p(e)}}}function ut(e){let n,r,o,s,c,i,a,l,d,y=e[1].message+"";document.title=n=e[0];let N=e[2]&&e[1].stack&&lt(e);return{c(){r=g(),o=h("h1"),s=m(e[0]),c=g(),i=h("p"),a=m(y),l=g(),N&&N.c(),d=$(),this.h()},l(t){S('[data-svelte="svelte-1moakz"]',document.head).forEach(p),r=E(t),o=_(t,"H1",{class:!0});var n=b(o);s=x(n,e[0]),n.forEach(p),c=E(t),i=_(t,"P",{class:!0});var u=b(i);a=x(u,y),u.forEach(p),l=E(t),N&&N.l(t),d=$(),this.h()},h(){v(o,"class","svelte-be3lyz"),v(i,"class","svelte-be3lyz")},m(t,e){f(t,r,e),f(t,o,e),u(o,s),f(t,c,e),f(t,i,e),u(i,a),f(t,l,e),N&&N.m(t,e),f(t,d,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&w(s,t[0]),2&e&&y!==(y=t[1].message+"")&&w(a,y),t[2]&&t[1].stack?N?N.p(t,e):(N=lt(t),N.c(),N.m(d.parentNode,d)):N&&(N.d(1),N=null)},i:t,o:t,d(t){t&&p(r),t&&p(o),t&&p(c),t&&p(i),t&&p(l),N&&N.d(t),t&&p(d)}}}function ft(t,e,n){let{status:r}=e,{error:o}=e;return t.$$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,!1]}class pt extends tt{constructor(t){super(),Z(this,t,ft,ut,c,{status:0,error:1})}}function dt(t){let n,r,o;const s=[t[4].props];var c=t[4].component;function i(t){let n={};for(let t=0;t<s.length;t+=1)n=e(n,s[t]);return{props:n}}return c&&(n=new c(i())),{c(){n&&F(n.$$.fragment),r=$()},l(t){n&&G(n.$$.fragment,t),r=$()},m(t,e){n&&W(n,t,e),f(t,r,e),o=!0},p(t,e){const o=16&e?H(s,[Y(t[4].props)]):{};if(c!==(c=t[4].component)){if(n){K();const t=n;D(t.$$.fragment,1,0,(()=>{X(t,1)})),M()}c?(n=new c(i()),F(n.$$.fragment),V(n.$$.fragment,1),W(n,r.parentNode,r)):n=null}else c&&n.$set(o)},i(t){o||(n&&V(n.$$.fragment,t),o=!0)},o(t){n&&D(n.$$.fragment,t),o=!1},d(t){t&&p(r),n&&X(n,t)}}}function ht(t){let e,n;return e=new pt({props:{error:t[0],status:t[1]}}),{c(){F(e.$$.fragment)},l(t){G(e.$$.fragment,t)},m(t,r){W(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i(t){n||(V(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){X(e,t)}}}function mt(t){let e,n,r,o;const s=[ht,dt],c=[];function i(t,e){return t[0]?0:1}return e=i(t),n=c[e]=s[e](t),{c(){n.c(),r=$()},l(t){n.l(t),r=$()},m(t,n){c[e].m(t,n),f(t,r,n),o=!0},p(t,o){let a=e;e=i(t),e===a?c[e].p(t,o):(K(),D(c[a],1,1,(()=>{c[a]=null})),M(),n=c[e],n?n.p(t,o):(n=c[e]=s[e](t),n.c()),V(n,1),n.m(r.parentNode,r))},i(t){o||(V(n),o=!0)},o(t){D(n),o=!1},d(t){c[e].d(t),t&&p(r)}}}function gt(t){let n,r;const o=[{segment:t[2][0]},t[3].props];let s={$$slots:{default:[mt]},$$scope:{ctx:t}};for(let t=0;t<o.length;t+=1)s=e(s,o[t]);return n=new at({props:s}),{c(){F(n.$$.fragment)},l(t){G(n.$$.fragment,t)},m(t,e){W(n,t,e),r=!0},p(t,[e]){const r=12&e?H(o,[4&e&&{segment:t[2][0]},8&e&&Y(t[3].props)]):{};147&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){r||(V(n.$$.fragment,t),r=!0)},o(t){D(n.$$.fragment,t),r=!1},d(t){X(n,t)}}}function $t(t,e,n){let{stores:r}=e,{error:o}=e,{status:s}=e,{segments:c}=e,{level0:i}=e,{level1:a=null}=e,{notify:l}=e;var u,f,p;return u=l,P().$$.after_update.push(u),f=rt,p=r,P().$$.context.set(f,p),t.$$set=t=>{"stores"in t&&n(5,r=t.stores),"error"in t&&n(0,o=t.error),"status"in t&&n(1,s=t.status),"segments"in t&&n(2,c=t.segments),"level0"in t&&n(3,i=t.level0),"level1"in t&&n(4,a=t.level1),"notify"in t&&n(6,l=t.notify)},[o,s,c,i,a,r,l]}class yt extends tt{constructor(t){super(),Z(this,t,$t,gt,c,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}const vt=[],bt=[{js:()=>Promise.all([import("./index.0a908372.js"),__inject_styles(["client-ce521509.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./about.7806b277.js"),__inject_styles(["client-ce521509.css"])]).then((function(t){return t[0]}))}],_t=[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]}];
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function xt(t,e,n,r){return new(n||(n=Promise))((function(o,s){function c(t){try{a(r.next(t))}catch(t){s(t)}}function i(t){try{a(r.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,i)}a((r=r.apply(t,e||[])).next())}))}function Et(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}let wt,St=1;const Nt="undefined"!=typeof history?history:{pushState:()=>{},replaceState:()=>{},scrollRestoration:"auto"},Rt={};let Pt,At;function Lt(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach((t=>{const[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r})),e}function jt(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(Pt))return null;let e=t.pathname.slice(Pt.length);if(""===e&&(e="/"),!vt.some((t=>t.test(e))))for(let n=0;n<_t.length;n+=1){const r=_t[n],o=r.pattern.exec(e);if(o){const n=Lt(t.search),s=r.parts[r.parts.length-1],c=s.params?s.params(o):{},i={host:location.host,path:e,query:n,params:c};return{href:t.href,route:r,match:o,page:i}}}}function kt(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return;if(t.defaultPrevented)return;const e=Et(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const s=jt(o);if(s){qt(s,null,e.hasAttribute("sapper:noscroll"),o.hash),t.preventDefault(),Nt.pushState({id:wt},"",o.href)}}function Ot(){return{x:pageXOffset,y:pageYOffset}}function Ct(t){if(Rt[wt]=Ot(),t.state){const e=jt(new URL(location.href));e?qt(e,t.state.id):location.href=location.href}else St=St+1,function(t){wt=t}(St),Nt.replaceState({id:wt},"",location.href)}function qt(t,e,n,r){return xt(this,void 0,void 0,(function*(){const o=!!e;if(o)wt=e;else{const t=Ot();Rt[wt]=t,wt=e=++St,Rt[wt]=n?t:{x:0,y:0}}if(yield At(t),document.activeElement&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),!n){let t,n=Rt[e];r&&(t=document.getElementById(r.slice(1)),t&&(n={x:0,y:t.getBoundingClientRect().top+scrollY})),Rt[wt]=n,o||t?scrollTo(n.x,n.y):scrollTo(0,0)}}))}function Tt(t){let e=t.baseURI;if(!e){const n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}let Ut,It=null;function Bt(t){const e=Et(t.target);e&&"prefetch"===e.rel&&function(t){const e=jt(new URL(t,Tt(document)));if(e)It&&t===It.href||(It={href:t,promise:ne(e)}),It.promise}(e.href)}function Jt(t){clearTimeout(Ut),Ut=setTimeout((()=>{Bt(t)}),20)}function zt(t,e={noscroll:!1,replaceState:!1}){const n=jt(new URL(t,Tt(document)));return n?(Nt[e.replaceState?"replaceState":"pushState"]({id:wt},"",t),qt(n,null,e.noscroll)):(location.href=t,new Promise((()=>{})))}const Kt="undefined"!=typeof __SAPPER__&&__SAPPER__;let Mt,Vt,Dt,Ht=!1,Yt=[],Ft="{}";const Gt={page:function(t){const e=nt(t);let n=!0;return{notify:function(){n=!0,e.update((t=>t))},set:function(t){n=!1,e.set(t)},subscribe:function(t){let r;return e.subscribe((e=>{(void 0===r||n&&e!==r)&&t(r=e)}))}}}({}),preloading:nt(null),session:nt(Kt&&Kt.session)};let Wt,Xt,Qt;function Zt(t,e){const{error:n}=t;return Object.assign({error:n},e)}function te(t){return xt(this,void 0,void 0,(function*(){Mt&&Gt.preloading.set(!0);const e=function(t){return It&&It.href===t.href?It.promise:ne(t)}(t),n=Vt={},r=yield e,{redirect:o}=r;if(n===Vt)if(o)yield zt(o.location,{replaceState:!0});else{const{props:e,branch:n}=r;yield ee(n,e,Zt(e,t.page))}}))}function ee(t,e,n){return xt(this,void 0,void 0,(function*(){Gt.page.set(n),Gt.preloading.set(!1),Mt?Mt.$set(e):(e.stores={page:{subscribe:Gt.page.subscribe},preloading:{subscribe:Gt.preloading.subscribe},session:Gt.session},e.level0={props:yield Dt},e.notify=Gt.page.notify,Mt=new yt({target:Qt,props:e,hydrate:!0})),Yt=t,Ft=JSON.stringify(n.query),Ht=!0,Xt=!1}))}function ne(t){return xt(this,void 0,void 0,(function*(){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const s={error:null,status:200,segments:[r[0]]},c={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{s.error="string"==typeof e?new Error(e):e,s.status=t}};if(!Dt){const t=()=>({});Dt=Kt.preloaded[0]||t.call(c,{host:n.host,path:n.path,query:n.query,params:{}},Wt)}let i,a=1;try{const o=JSON.stringify(n.query),l=e.pattern.exec(n.path);let u=!1;i=yield Promise.all(e.parts.map(((e,i)=>xt(this,void 0,void 0,(function*(){const f=r[i];if(function(t,e,n,r){if(r!==Ft)return!0;const o=Yt[t];return!!o&&(e!==o.segment||!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0)}(i,f,l,o)&&(u=!0),s.segments[a]=r[i+1],!e)return{segment:f};const p=a++;if(!Xt&&!u&&Yt[i]&&Yt[i].part===e.i)return Yt[i];u=!1;const{default:d,preload:h}=yield bt[e.i].js();let m;return m=Ht||!Kt.preloaded[i+1]?h?yield h.call(c,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},Wt):{}:Kt.preloaded[i+1],s[`level${p}`]={component:d,props:m,segment:f,match:l,part:e.i}})))))}catch(t){s.error=t,s.status=500,i=[]}return{redirect:o,props:s,branch:i}}))}var re,oe,se;Gt.session.subscribe((t=>xt(void 0,void 0,void 0,(function*(){if(Wt=t,!Ht)return;Xt=!0;const e=jt(new URL(location.href)),n=Vt={},{redirect:r,props:o,branch:s}=yield ne(e);n===Vt&&(r?yield zt(r.location,{replaceState:!0}):yield ee(s,o,Zt(o,e.page)))})))),re={target:document.querySelector("#sapper")},oe=re.target,Qt=oe,se=Kt.baseUrl,Pt=se,At=te,"scrollRestoration"in Nt&&(Nt.scrollRestoration="manual"),addEventListener("beforeunload",(()=>{Nt.scrollRestoration="auto"})),addEventListener("load",(()=>{Nt.scrollRestoration="manual"})),addEventListener("click",kt),addEventListener("popstate",Ct),addEventListener("touchstart",Bt),addEventListener("mousemove",Jt),Kt.error?Promise.resolve().then((()=>function(){const{host:t,pathname:e,search:n}=location,{session:r,preloaded:o,status:s,error:c}=Kt;Dt||(Dt=o&&o[0]);const i={error:c,status:s,session:r,level0:{props:Dt},level1:{props:{status:s,error:c},component:pt},segments:o},a=Lt(n);ee([],i,{host:t,path:e,query:a,params:{},error:c})}())):Promise.resolve().then((()=>{const{hash:t,href:e}=location;Nt.replaceState({id:St},"",e);const n=jt(new URL(location.href));if(n)return qt(n,St,!0,t)}));export{l as A,$ as B,S as C,tt as S,g as a,b,_ as c,x as d,h as e,p as f,E as g,v as h,Z as i,f as j,u as k,w as l,F as m,t as n,G as o,W as p,V as q,D as r,c as s,m as t,X as u,d as v,K as w,M as x,i as y,y as z};

import __inject_styles from './inject_styles.5607aec6.js';