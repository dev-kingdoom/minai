import{c as s,d as r}from"./index.C2zJs1dP.js";const h=async(i="")=>{let a=null;const e=await fetch(`${r}/config`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...i&&{authorization:`Bearer ${i}`}}}).then(async n=>{if(!n.ok)throw await n.json();return n.json()}).catch(n=>(console.log(n),"detail"in n?a=n.detail:a="Server connection failed",null));if(a)throw a;return e},p=async(i="",a)=>{let e=null;const n=await fetch(`${r}/config/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",...i&&{authorization:`Bearer ${i}`}},body:JSON.stringify({...a})}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>(console.log(t),"detail"in t?e=t.detail:e="Server connection failed",null));if(e)throw e;return n},u=async(i,a)=>{let e=null;const n=await fetch(`${r}/models${typeof a=="number"?`/${a}`:""}`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",...i&&{authorization:`Bearer ${i}`}}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>{var o;return e=`OpenAI: ${((o=t==null?void 0:t.error)==null?void 0:o.message)??"Network Problem"}`,[]});if(e)throw e;return n},f=async(i="",a="https://api.openai.com/v1",e="")=>{let n=null;const t=await fetch(`${r}/verify`,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({url:a,key:e})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).catch(o=>{var c;return n=`OpenAI: ${((c=o==null?void 0:o.error)==null?void 0:c.message)??"Network Problem"}`,[]});if(n)throw n;return t},y=async(i="",a,e=`${s}/api`)=>{const n=new AbortController;let t=null;const o=await fetch(`${e}/chat/completions`,{signal:n.signal,method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(a)}).catch(c=>(console.log(c),t=c,null));if(t)throw t;return[o,n]},d=async(i="",a,e=`${s}/api`)=>{let n=null;const t=await fetch(`${e}/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(a)}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).catch(o=>(n=`${(o==null?void 0:o.detail)??o}`,null));if(n)throw n;return t};export{h as a,u as b,y as c,d as g,p as u,f as v};
//# sourceMappingURL=index.TNrF8u2r.js.map
