import{s as y,l as d,i as b,d as _,j as g,p as N,q as O,e as h,c as v,a as $,f as k,g as q,n as T}from"../chunks/scheduler.Dg_Xn4WQ.js";import{S as U,i as B,a as f,c as C,t as p,g as D,b as I,d as S,m as w,e as R}from"../chunks/index.gNonUo3Z.js";import{g as P}from"../chunks/entry.C1o6s8Km.js";import{p as W}from"../chunks/stores.C9kw2blP.js";import{a as j,u as Q,g as F}from"../chunks/index.DOfUwrRA.js";import{S as H}from"../chunks/Spinner.C_k6OlPC.js";import{T as M}from"../chunks/ToolkitEditor.QYCBOm57.js";import{a as E,t as z}from"../chunks/index.C2zJs1dP.js";import{e as A,c as G}from"../chunks/index.bquoJ5FE.js";import{t as u}from"../chunks/Toaster.svelte_svelte_type_style_lang.CM0nbnqF.js";function J(l){let e,t,o,s;return o=new H({}),{c(){e=h("div"),t=h("div"),I(o.$$.fragment),this.h()},l(r){e=v(r,"DIV",{class:!0});var a=$(e);t=v(a,"DIV",{class:!0});var m=$(t);S(o.$$.fragment,m),m.forEach(_),a.forEach(_),this.h()},h(){k(t,"class","pb-16"),k(e,"class","flex items-center justify-center h-full")},m(r,a){b(r,e,a),q(e,t),w(o,t,null),s=!0},p:T,i(r){s||(p(o.$$.fragment,r),s=!0)},o(r){f(o.$$.fragment,r),s=!1},d(r){r&&_(e),R(o)}}}function K(l){let e,t;return e=new M({props:{edit:!0,id:l[0].id,name:l[0].name,meta:l[0].meta,content:l[0].content,accessControl:l[0].access_control}}),e.$on("save",l[3]),{c(){I(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,s){w(e,o,s),t=!0},p(o,s){const r={};s&1&&(r.id=o[0].id),s&1&&(r.name=o[0].name),s&1&&(r.meta=o[0].meta),s&1&&(r.content=o[0].content),s&1&&(r.accessControl=o[0].access_control),e.$set(r)},i(o){t||(p(e.$$.fragment,o),t=!0)},o(o){f(e.$$.fragment,o),t=!1},d(o){R(e,o)}}}function L(l){let e,t,o,s;const r=[K,J],a=[];function m(c,n){return c[0]?0:1}return e=m(l),t=a[e]=r[e](l),{c(){t.c(),o=d()},l(c){t.l(c),o=d()},m(c,n){a[e].m(c,n),b(c,o,n),s=!0},p(c,[n]){let i=e;e=m(c),e===i?a[e].p(c,n):(D(),f(a[i],1,1,()=>{a[i]=null}),C(),t=a[e],t?t.p(c,n):(t=a[e]=r[e](c),t.c()),p(t,1),t.m(o.parentNode,o))},i(c){s||(p(t),s=!0)},o(c){f(t),s=!1},d(c){c&&_(o),a[e].d(c)}}}function X(l,e,t){let o,s;g(l,W,n=>t(4,o=n));const r=N("i18n");g(l,r,n=>t(5,s=n));let a=null;const m=async n=>{console.log(n);const i=A(n.content);if(G((i==null?void 0:i.required_open_webui_version)??"0.0.0",E)){console.log("Version is lower than required"),u.error(s.t("Open WebUI version (v{{OPEN_WEBUI_VERSION}}) is lower than required version (v{{REQUIRED_VERSION}})",{OPEN_WEBUI_VERSION:E,REQUIRED_VERSION:(i==null?void 0:i.required_open_webui_version)??"0.0.0"}));return}await Q(localStorage.token,a.id,{id:n.id,name:n.name,meta:n.meta,content:n.content,access_control:n.access_control}).catch(V=>(u.error(`${V}`),null))&&(u.success(s.t("Tool updated successfully")),z.set(await F(localStorage.token)))};return O(async()=>{console.log("mounted");const n=o.url.searchParams.get("id");n&&(t(0,a=await j(localStorage.token,n).catch(i=>(u.error(`${i}`),P("/workspace/tools"),null))),console.log(a))}),[a,r,m,n=>{m(n.detail)}]}class le extends U{constructor(e){super(),B(this,e,X,L,y,{})}}export{le as component};
//# sourceMappingURL=32.CeQnQKIO.js.map
