function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function a(t,e,n,r,o,s,c){const a=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,s);if(a){const o=i(e,n,r,c);t.p(o,a)}}function l(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function p(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function d(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function m(){return h(" ")}function g(){return h("")}function $(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t){return Array.from(t.childNodes)}function b(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;const s=[];for(;e<o.attributes.length;){const t=o.attributes[e++];n[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):d(e)}function _(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return h(e)}function x(t){return _(t," ")}function E(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e=document.body){return Array.from(e.querySelectorAll(t))}let S;function N(t){S=t}function R(){if(!S)throw new Error("Function called outside component initialization");return S}const P=[],A=[],L=[],j=[],k=Promise.resolve();let O=!1;function q(t){L.push(t)}let C=!1;const T=new Set;function U(){if(!C){C=!0;do{for(let t=0;t<P.length;t+=1){const e=P[t];N(e),I(e.$$)}for(N(null),P.length=0;A.length;)A.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];T.has(e)||(T.add(e),e())}L.length=0}while(P.length);for(;j.length;)j.pop()();O=!1,C=!1,T.clear()}}function I(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const B=new Set;let J;function z(){J={r:0,c:[],p:J}}function K(){J.r||o(J.c),J=J.p}function M(t,e){t&&t.i&&(B.delete(t),t.i(e))}function V(t,e,n,r){if(t&&t.o){if(B.has(t))return;B.add(t),J.c.push((()=>{B.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function D(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const c=t[s],i=e[s];if(i){for(const t in c)t in i||(r[t]=1);for(const t in i)o[t]||(n[t]=i[t],o[t]=1);t[s]=i}else for(const t in c)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function H(t){return"object"==typeof t&&null!==t?t:{}}function Y(t){t&&t.c()}function F(t,e){t&&t.l(e)}function G(t,e,r){const{fragment:c,on_mount:i,on_destroy:a,after_update:l}=t.$$;c&&c.m(e,r),q((()=>{const e=i.map(n).filter(s);a?a.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(q)}function W(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){-1===t.$$.dirty[0]&&(P.push(t),O||(O=!0,k.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(e,n,s,c,i,a,l=[-1]){const u=S;N(e);const p=n.props||{},d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l,skip_bound:!1};let h=!1;if(d.ctx=s?s(e,p,((t,n,...r)=>{const o=r.length?r[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),h&&X(e,t)),n})):[],d.update(),h=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),n.target){if(n.hydrate){const t=v(n.target);d.fragment&&d.fragment.l(t),t.forEach(f)}else d.fragment&&d.fragment.c();n.intro&&M(e.$$.fragment),G(e,n.target,n.anchor),U()}N(u)}class Z{$destroy(){W(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const tt=[];function et(e,n=t){let r;const o=[];function s(t){if(c(e,t)&&(e=t,r)){const t=!tt.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),tt.push(n,e)}if(t){for(let t=0;t<tt.length;t+=2)tt[t][0](tt[t+1]);tt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const a=[c,i];return o.push(a),1===o.length&&(r=n(s)||t),c(e),()=>{const t=o.indexOf(a);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const nt={},rt=t=>({segment:1&t}),ot=t=>({segment:t[0]});function st(t){let e,n;const r=t[2].default,o=function(t,e,n,r){if(t){const o=i(t,e,n,r);return t[0](o)}}(r,t,t[1],ot);return{c(){e=d("main"),o&&o.c()},l(t){e=b(t,"MAIN",{});var n=v(e);o&&o.l(n),n.forEach(f)},m(t,r){u(t,e,r),o&&o.m(e,null),n=!0},p(t,[e]){o&&o.p&&3&e&&a(o,r,t,t[1],e,rt,ot)},i(t){n||(M(o,t),n=!0)},o(t){V(o,t),n=!1},d(t){t&&f(e),o&&o.d(t)}}}function ct(t,e,n){let{$$slots:r={},$$scope:o}=e,{segment:s}=e;return t.$$set=t=>{"segment"in t&&n(0,s=t.segment),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class it extends Z{constructor(t){super(),Q(this,t,ct,st,c,{segment:0})}}function at(t){let e,n,r=t[1].stack+"";return{c(){e=d("pre"),n=h(r)},l(t){e=b(t,"PRE",{});var o=v(e);n=_(o,r),o.forEach(f)},m(t,r){u(t,e,r),l(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&E(n,r)},d(t){t&&f(e)}}}function lt(e){let n,r,o,s,c,i,a,p,$,S=e[1].message+"";document.title=n=e[0];let N=e[2]&&e[1].stack&&at(e);return{c(){r=m(),o=d("h1"),s=h(e[0]),c=m(),i=d("p"),a=h(S),p=m(),N&&N.c(),$=g(),this.h()},l(t){w('[data-svelte="svelte-1moakz"]',document.head).forEach(f),r=x(t),o=b(t,"H1",{class:!0});var n=v(o);s=_(n,e[0]),n.forEach(f),c=x(t),i=b(t,"P",{class:!0});var l=v(i);a=_(l,S),l.forEach(f),p=x(t),N&&N.l(t),$=g(),this.h()},h(){y(o,"class","svelte-be3lyz"),y(i,"class","svelte-be3lyz")},m(t,e){u(t,r,e),u(t,o,e),l(o,s),u(t,c,e),u(t,i,e),l(i,a),u(t,p,e),N&&N.m(t,e),u(t,$,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&E(s,t[0]),2&e&&S!==(S=t[1].message+"")&&E(a,S),t[2]&&t[1].stack?N?N.p(t,e):(N=at(t),N.c(),N.m($.parentNode,$)):N&&(N.d(1),N=null)},i:t,o:t,d(t){t&&f(r),t&&f(o),t&&f(c),t&&f(i),t&&f(p),N&&N.d(t),t&&f($)}}}function ut(t,e,n){let{status:r}=e,{error:o}=e;return t.$$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,!1]}class ft extends Z{constructor(t){super(),Q(this,t,ut,lt,c,{status:0,error:1})}}function pt(t){let n,r,o;const s=[t[4].props];var c=t[4].component;function i(t){let n={};for(let t=0;t<s.length;t+=1)n=e(n,s[t]);return{props:n}}return c&&(n=new c(i())),{c(){n&&Y(n.$$.fragment),r=g()},l(t){n&&F(n.$$.fragment,t),r=g()},m(t,e){n&&G(n,t,e),u(t,r,e),o=!0},p(t,e){const o=16&e?D(s,[H(t[4].props)]):{};if(c!==(c=t[4].component)){if(n){z();const t=n;V(t.$$.fragment,1,0,(()=>{W(t,1)})),K()}c?(n=new c(i()),Y(n.$$.fragment),M(n.$$.fragment,1),G(n,r.parentNode,r)):n=null}else c&&n.$set(o)},i(t){o||(n&&M(n.$$.fragment,t),o=!0)},o(t){n&&V(n.$$.fragment,t),o=!1},d(t){t&&f(r),n&&W(n,t)}}}function dt(t){let e,n;return e=new ft({props:{error:t[0],status:t[1]}}),{c(){Y(e.$$.fragment)},l(t){F(e.$$.fragment,t)},m(t,r){G(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i(t){n||(M(e.$$.fragment,t),n=!0)},o(t){V(e.$$.fragment,t),n=!1},d(t){W(e,t)}}}function ht(t){let e,n,r,o;const s=[dt,pt],c=[];function i(t,e){return t[0]?0:1}return e=i(t),n=c[e]=s[e](t),{c(){n.c(),r=g()},l(t){n.l(t),r=g()},m(t,n){c[e].m(t,n),u(t,r,n),o=!0},p(t,o){let a=e;e=i(t),e===a?c[e].p(t,o):(z(),V(c[a],1,1,(()=>{c[a]=null})),K(),n=c[e],n?n.p(t,o):(n=c[e]=s[e](t),n.c()),M(n,1),n.m(r.parentNode,r))},i(t){o||(M(n),o=!0)},o(t){V(n),o=!1},d(t){c[e].d(t),t&&f(r)}}}function mt(t){let n,r;const o=[{segment:t[2][0]},t[3].props];let s={$$slots:{default:[ht]},$$scope:{ctx:t}};for(let t=0;t<o.length;t+=1)s=e(s,o[t]);return n=new it({props:s}),{c(){Y(n.$$.fragment)},l(t){F(n.$$.fragment,t)},m(t,e){G(n,t,e),r=!0},p(t,[e]){const r=12&e?D(o,[4&e&&{segment:t[2][0]},8&e&&H(t[3].props)]):{};147&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){r||(M(n.$$.fragment,t),r=!0)},o(t){V(n.$$.fragment,t),r=!1},d(t){W(n,t)}}}function gt(t,e,n){let{stores:r}=e,{error:o}=e,{status:s}=e,{segments:c}=e,{level0:i}=e,{level1:a=null}=e,{notify:l}=e;var u,f,p;return u=l,R().$$.after_update.push(u),f=nt,p=r,R().$$.context.set(f,p),t.$$set=t=>{"stores"in t&&n(5,r=t.stores),"error"in t&&n(0,o=t.error),"status"in t&&n(1,s=t.status),"segments"in t&&n(2,c=t.segments),"level0"in t&&n(3,i=t.level0),"level1"in t&&n(4,a=t.level1),"notify"in t&&n(6,l=t.notify)},[o,s,c,i,a,r,l]}class $t extends Z{constructor(t){super(),Q(this,t,gt,mt,c,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}const yt=[],vt=[{js:()=>Promise.all([import("./index.9ef56d31.js"),__inject_styles(["client-ba1bfd69.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./about.83204338.js"),__inject_styles(["client-ba1bfd69.css"])]).then((function(t){return t[0]}))}],bt=[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]}];
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
function _t(t,e,n,r){return new(n||(n=Promise))((function(o,s){function c(t){try{a(r.next(t))}catch(t){s(t)}}function i(t){try{a(r.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,i)}a((r=r.apply(t,e||[])).next())}))}function xt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}let Et,wt=1;const St="undefined"!=typeof history?history:{pushState:()=>{},replaceState:()=>{},scrollRestoration:"auto"},Nt={};let Rt,Pt;function At(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach((t=>{const[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r})),e}function Lt(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(Rt))return null;let e=t.pathname.slice(Rt.length);if(""===e&&(e="/"),!yt.some((t=>t.test(e))))for(let n=0;n<bt.length;n+=1){const r=bt[n],o=r.pattern.exec(e);if(o){const n=At(t.search),s=r.parts[r.parts.length-1],c=s.params?s.params(o):{},i={host:location.host,path:e,query:n,params:c};return{href:t.href,route:r,match:o,page:i}}}}function jt(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return;if(t.defaultPrevented)return;const e=xt(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const s=Lt(o);if(s){qt(s,null,e.hasAttribute("sapper:noscroll"),o.hash),t.preventDefault(),St.pushState({id:Et},"",o.href)}}function kt(){return{x:pageXOffset,y:pageYOffset}}function Ot(t){if(Nt[Et]=kt(),t.state){const e=Lt(new URL(location.href));e?qt(e,t.state.id):location.href=location.href}else wt=wt+1,function(t){Et=t}(wt),St.replaceState({id:Et},"",location.href)}function qt(t,e,n,r){return _t(this,void 0,void 0,(function*(){const o=!!e;if(o)Et=e;else{const t=kt();Nt[Et]=t,Et=e=++wt,Nt[Et]=n?t:{x:0,y:0}}if(yield Pt(t),document.activeElement&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),!n){let t,n=Nt[e];r&&(t=document.getElementById(r.slice(1)),t&&(n={x:0,y:t.getBoundingClientRect().top+scrollY})),Nt[Et]=n,o||t?scrollTo(n.x,n.y):scrollTo(0,0)}}))}function Ct(t){let e=t.baseURI;if(!e){const n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}let Tt,Ut=null;function It(t){const e=xt(t.target);e&&"prefetch"===e.rel&&function(t){const e=Lt(new URL(t,Ct(document)));if(e)Ut&&t===Ut.href||(Ut={href:t,promise:ee(e)}),Ut.promise}(e.href)}function Bt(t){clearTimeout(Tt),Tt=setTimeout((()=>{It(t)}),20)}function Jt(t,e={noscroll:!1,replaceState:!1}){const n=Lt(new URL(t,Ct(document)));return n?(St[e.replaceState?"replaceState":"pushState"]({id:Et},"",t),qt(n,null,e.noscroll)):(location.href=t,new Promise((()=>{})))}const zt="undefined"!=typeof __SAPPER__&&__SAPPER__;let Kt,Mt,Vt,Dt=!1,Ht=[],Yt="{}";const Ft={page:function(t){const e=et(t);let n=!0;return{notify:function(){n=!0,e.update((t=>t))},set:function(t){n=!1,e.set(t)},subscribe:function(t){let r;return e.subscribe((e=>{(void 0===r||n&&e!==r)&&t(r=e)}))}}}({}),preloading:et(null),session:et(zt&&zt.session)};let Gt,Wt,Xt;function Qt(t,e){const{error:n}=t;return Object.assign({error:n},e)}function Zt(t){return _t(this,void 0,void 0,(function*(){Kt&&Ft.preloading.set(!0);const e=function(t){return Ut&&Ut.href===t.href?Ut.promise:ee(t)}(t),n=Mt={},r=yield e,{redirect:o}=r;if(n===Mt)if(o)yield Jt(o.location,{replaceState:!0});else{const{props:e,branch:n}=r;yield te(n,e,Qt(e,t.page))}}))}function te(t,e,n){return _t(this,void 0,void 0,(function*(){Ft.page.set(n),Ft.preloading.set(!1),Kt?Kt.$set(e):(e.stores={page:{subscribe:Ft.page.subscribe},preloading:{subscribe:Ft.preloading.subscribe},session:Ft.session},e.level0={props:yield Vt},e.notify=Ft.page.notify,Kt=new $t({target:Xt,props:e,hydrate:!0})),Ht=t,Yt=JSON.stringify(n.query),Dt=!0,Wt=!1}))}function ee(t){return _t(this,void 0,void 0,(function*(){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const s={error:null,status:200,segments:[r[0]]},c={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{s.error="string"==typeof e?new Error(e):e,s.status=t}};if(!Vt){const t=()=>({});Vt=zt.preloaded[0]||t.call(c,{host:n.host,path:n.path,query:n.query,params:{}},Gt)}let i,a=1;try{const o=JSON.stringify(n.query),l=e.pattern.exec(n.path);let u=!1;i=yield Promise.all(e.parts.map(((e,i)=>_t(this,void 0,void 0,(function*(){const f=r[i];if(function(t,e,n,r){if(r!==Yt)return!0;const o=Ht[t];return!!o&&(e!==o.segment||!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0)}(i,f,l,o)&&(u=!0),s.segments[a]=r[i+1],!e)return{segment:f};const p=a++;if(!Wt&&!u&&Ht[i]&&Ht[i].part===e.i)return Ht[i];u=!1;const{default:d,preload:h}=yield vt[e.i].js();let m;return m=Dt||!zt.preloaded[i+1]?h?yield h.call(c,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},Gt):{}:zt.preloaded[i+1],s[`level${p}`]={component:d,props:m,segment:f,match:l,part:e.i}})))))}catch(t){s.error=t,s.status=500,i=[]}return{redirect:o,props:s,branch:i}}))}var ne,re,oe;Ft.session.subscribe((t=>_t(void 0,void 0,void 0,(function*(){if(Gt=t,!Dt)return;Wt=!0;const e=Lt(new URL(location.href)),n=Mt={},{redirect:r,props:o,branch:s}=yield ee(e);n===Mt&&(r?yield Jt(r.location,{replaceState:!0}):yield te(s,o,Qt(o,e.page)))})))),ne={target:document.querySelector("#sapper")},re=ne.target,Xt=re,oe=zt.baseUrl,Rt=oe,Pt=Zt,"scrollRestoration"in St&&(St.scrollRestoration="manual"),addEventListener("beforeunload",(()=>{St.scrollRestoration="auto"})),addEventListener("load",(()=>{St.scrollRestoration="manual"})),addEventListener("click",jt),addEventListener("popstate",Ot),addEventListener("touchstart",It),addEventListener("mousemove",Bt),zt.error?Promise.resolve().then((()=>function(){const{host:t,pathname:e,search:n}=location,{session:r,preloaded:o,status:s,error:c}=zt;Vt||(Vt=o&&o[0]);const i={error:c,status:s,session:r,level0:{props:Vt},level1:{props:{status:s,error:c},component:ft},segments:o},a=At(n);te([],i,{host:t,path:e,query:a,params:{},error:c})}())):Promise.resolve().then((()=>{const{hash:t,href:e}=location;St.replaceState({id:wt},"",e);const n=Lt(new URL(location.href));if(n)return qt(n,wt,!0,t)}));export{$ as A,o as B,Z as S,m as a,v as b,b as c,_ as d,d as e,f,x as g,y as h,Q as i,u as j,l as k,E as l,Y as m,t as n,F as o,G as p,M as q,V as r,c as s,h as t,W as u,p as v,z as w,K as x,g as y,w as z};

import __inject_styles from './inject_styles.5607aec6.js';