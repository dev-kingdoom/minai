import{b as r}from"./index.C2zJs1dP.js";const s=async(i,a,n,t)=>{let e=null;const o=await fetch(`${r}/knowledge/create`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`},body:JSON.stringify({name:a,description:n,access_control:t})}).then(async c=>{if(!c.ok)throw await c.json();return c.json()}).catch(c=>(e=c.detail,console.log(c),null));if(e)throw e;return o},h=async(i="")=>{let a=null;const n=await fetch(`${r}/knowledge/`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).then(t=>t).catch(t=>(a=t.detail,console.log(t),null));if(a)throw a;return n},d=async(i="")=>{let a=null;const n=await fetch(`${r}/knowledge/list`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).then(t=>t).catch(t=>(a=t.detail,console.log(t),null));if(a)throw a;return n},u=async(i,a)=>{let n=null;const t=await fetch(`${r}/knowledge/${a}`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`}}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).then(e=>e).catch(e=>(n=e.detail,console.log(e),null));if(n)throw n;return t},p=async(i,a,n)=>{let t=null;const e=await fetch(`${r}/knowledge/${a}/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`},body:JSON.stringify({name:n!=null&&n.name?n.name:void 0,description:n!=null&&n.description?n.description:void 0,data:n!=null&&n.data?n.data:void 0,access_control:n.access_control})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).then(o=>o).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return e},w=async(i,a,n)=>{let t=null;const e=await fetch(`${r}/knowledge/${a}/file/add`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`},body:JSON.stringify({file_id:n})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).then(o=>o).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return e},y=async(i,a,n)=>{let t=null;const e=await fetch(`${r}/knowledge/${a}/file/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`},body:JSON.stringify({file_id:n})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).then(o=>o).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return e},j=async(i,a,n)=>{let t=null;const e=await fetch(`${r}/knowledge/${a}/file/remove`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`},body:JSON.stringify({file_id:n})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).then(o=>o).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return e},g=async(i,a)=>{let n=null;const t=await fetch(`${r}/knowledge/${a}/reset`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`}}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).then(e=>e).catch(e=>(n=e.detail,console.log(e),null));if(n)throw n;return t},$=async(i,a)=>{let n=null;const t=await fetch(`${r}/knowledge/${a}/delete`,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${i}`}}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).then(e=>e).catch(e=>(n=e.detail,console.log(e),null));if(n)throw n;return t};export{d as a,u as b,s as c,$ as d,w as e,j as f,h as g,p as h,g as r,y as u};
//# sourceMappingURL=index.Bzw6WA74.js.map
