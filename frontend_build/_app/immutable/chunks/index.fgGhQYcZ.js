import{I as i}from"./index.C2zJs1dP.js";const r=async(a="")=>{let t=null;const o=await fetch(`${i}/config`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}}}).then(async n=>{if(!n.ok)throw await n.json();return n.json()}).catch(n=>(console.log(n),"detail"in n?t=n.detail:t="Server connection failed",null));if(t)throw t;return o},l=async(a="",t)=>{let o=null;const n=await fetch(`${i}/config/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}},body:JSON.stringify({...t})}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).catch(e=>(console.log(e),"detail"in e?o=e.detail:o="Server connection failed",null));if(o)throw o;return n},s=async(a="")=>{let t=null;const o=await fetch(`${i}/config/url/verify`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}}}).then(async n=>{if(!n.ok)throw await n.json();return n.json()}).catch(n=>(console.log(n),"detail"in n?t=n.detail:t="Server connection failed",null));if(t)throw t;return o},h=async(a="")=>{let t=null;const o=await fetch(`${i}/image/config`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}}}).then(async n=>{if(!n.ok)throw await n.json();return n.json()}).catch(n=>(console.log(n),"detail"in n?t=n.detail:t="Server connection failed",null));if(t)throw t;return o},f=async(a="",t)=>{let o=null;const n=await fetch(`${i}/image/config/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}},body:JSON.stringify({...t})}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).catch(e=>(console.log(e),"detail"in e?o=e.detail:o="Server connection failed",null));if(o)throw o;return n},p=async(a="")=>{let t=null;const o=await fetch(`${i}/models`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}}}).then(async n=>{if(!n.ok)throw await n.json();return n.json()}).catch(n=>(console.log(n),"detail"in n?t=n.detail:t="Server connection failed",null));if(t)throw t;return o},u=async(a="",t)=>{let o=null;const n=await fetch(`${i}/generations`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",...a&&{authorization:`Bearer ${a}`}},body:JSON.stringify({prompt:t})}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).catch(e=>(console.log(e),"detail"in e?o=e.detail:o="Server connection failed",null));if(o)throw o;return n};export{h as a,p as b,f as c,r as g,u as i,l as u,s as v};
//# sourceMappingURL=index.fgGhQYcZ.js.map
