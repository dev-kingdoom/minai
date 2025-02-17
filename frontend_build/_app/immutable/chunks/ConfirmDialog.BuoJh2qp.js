import{s as $,l as G,i as D,d as c,p as ee,j as te,B as le,q as ne,r as oe,e as v,k as U,t as B,c as p,a as E,o as K,b as N,f as b,g,u as H,v as ae,w as ie,x as se,h as S,Q as J,H as re,y as fe,C as W}from"./scheduler.Dg_Xn4WQ.js";import{S as ue,i as ce,t as M,g as de,a as Q,c as _e,h as Y}from"./index.gNonUo3Z.js";import{f as me}from"./index.nST1YYiD.js";import{f as he}from"./index.BFuekP1B.js";function Z(n){let e,t,l,o,a,s,r,u,L,T,y,C,I,P,d,k,w;function j(f,h){return f[2]!==""?ge:be}let V=j(n),_=V(n);const z=n[16].default,q=oe(z,n,n[15],null),m=q||we(n);return{c(){e=v("div"),t=v("div"),l=v("div"),o=v("div"),_.c(),a=U(),m&&m.c(),s=U(),r=v("div"),u=v("button"),L=B(n[4]),T=U(),y=v("button"),C=B(n[5]),this.h()},l(f){e=p(f,"DIV",{class:!0});var h=E(e);t=p(h,"DIV",{class:!0});var i=E(t);l=p(i,"DIV",{class:!0});var A=E(l);o=p(A,"DIV",{class:!0});var R=E(o);_.l(R),R.forEach(c),a=K(A),m&&m.l(A),s=K(A),r=p(A,"DIV",{class:!0});var O=E(r);u=p(O,"BUTTON",{class:!0,type:!0});var X=E(u);L=N(X,n[4]),X.forEach(c),T=K(O),y=p(O,"BUTTON",{class:!0,type:!0});var F=E(y);C=N(F,n[5]),F.forEach(c),O.forEach(c),A.forEach(c),i.forEach(c),h.forEach(c),this.h()},h(){b(o,"class","text-lg font-semibold dark:text-gray-200 mb-2.5"),b(u,"class","bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-white font-medium w-full py-2.5 rounded-lg transition"),b(u,"type","button"),b(y,"class","bg-gray-900 hover:bg-gray-850 text-gray-100 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-800 font-medium w-full py-2.5 rounded-lg transition"),b(y,"type","button"),b(r,"class","mt-6 flex justify-between gap-1.5"),b(l,"class","px-[1.75rem] py-6 flex flex-col"),b(t,"class","m-auto rounded-2xl max-w-full w-[32rem] mx-2 bg-gray-50 dark:bg-gray-950 max-h-[100dvh] shadow-3xl"),b(e,"class","fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] flex justify-center z-[99999999] overflow-hidden overscroll-contain")},m(f,h){D(f,e,h),g(e,t),g(t,l),g(l,o),_.m(o,null),g(l,a),m&&m.m(l,null),g(l,s),g(l,r),g(r,u),g(u,L),g(r,T),g(r,y),g(y,C),n[20](e),d=!0,k||(w=[H(u,"click",n[18]),H(y,"click",n[19]),H(t,"mousedown",pe),H(e,"mousedown",n[21])],k=!0)},p(f,h){V===(V=j(f))&&_?_.p(f,h):(_.d(1),_=V(f),_&&(_.c(),_.m(o,null))),q?q.p&&(!d||h&32768)&&ae(q,z,f,f[15],d?se(z,f[15],h,null):ie(f[15]),null):m&&m.p&&(!d||h&714)&&m.p(f,d?h:-1),(!d||h&16)&&S(L,f[4]),(!d||h&32)&&S(C,f[5])},i(f){d||(M(m,f),f&&(I||J(()=>{I=Y(t,he,{}),I.start()})),f&&(P||J(()=>{P=Y(e,me,{duration:10}),P.start()})),d=!0)},o(f){Q(m,f),d=!1},d(f){f&&c(e),_.d(),m&&m.d(f),n[20](null),k=!1,re(w)}}}function be(n){let e=n[9].t("Confirm your action")+"",t;return{c(){t=B(e)},l(l){t=N(l,e)},m(l,o){D(l,t,o)},p(l,o){o&512&&e!==(e=l[9].t("Confirm your action")+"")&&S(t,e)},d(l){l&&c(t)}}}function ge(n){let e;return{c(){e=B(n[2])},l(t){e=N(t,n[2])},m(t,l){D(t,e,l)},p(t,l){l&4&&S(e,t[2])},d(t){t&&c(e)}}}function ye(n){let e=n[9].t("This action cannot be undone. Do you wish to continue?")+"",t;return{c(){t=B(e)},l(l){t=N(l,e)},m(l,o){D(l,t,o)},p(l,o){o&512&&e!==(e=l[9].t("This action cannot be undone. Do you wish to continue?")+"")&&S(t,e)},d(l){l&&c(t)}}}function ke(n){let e;return{c(){e=B(n[3])},l(t){e=N(t,n[3])},m(t,l){D(t,e,l)},p(t,l){l&8&&S(e,t[3])},d(t){t&&c(e)}}}function x(n){let e,t,l,o;return{c(){e=v("textarea"),this.h()},l(a){e=p(a,"TEXTAREA",{placeholder:!0,class:!0,rows:!0}),E(e).forEach(c),this.h()},h(){b(e,"placeholder",t=n[7]?n[7]:n[9].t("Enter your message")),b(e,"class","w-full mt-2 rounded-lg px-4 py-2 text-sm dark:text-gray-300 dark:bg-gray-900 outline-none resize-none"),b(e,"rows","3"),e.required=!0},m(a,s){D(a,e,s),W(e,n[1]),l||(o=H(e,"input",n[17]),l=!0)},p(a,s){s&640&&t!==(t=a[7]?a[7]:a[9].t("Enter your message"))&&b(e,"placeholder",t),s&2&&W(e,a[1])},d(a){a&&c(e),l=!1,o()}}}function we(n){let e,t;function l(r,u){return r[3]!==""?ke:ye}let o=l(n),a=o(n),s=n[6]&&x(n);return{c(){e=v("div"),a.c(),t=U(),s&&s.c(),this.h()},l(r){e=p(r,"DIV",{class:!0});var u=E(e);a.l(u),t=K(u),s&&s.l(u),u.forEach(c),this.h()},h(){b(e,"class","text-sm text-gray-500 flex-1")},m(r,u){D(r,e,u),a.m(e,null),g(e,t),s&&s.m(e,null)},p(r,u){o===(o=l(r))&&a?a.p(r,u):(a.d(1),a=o(r),a&&(a.c(),a.m(e,t))),r[6]?s?s.p(r,u):(s=x(r),s.c(),s.m(e,null)):s&&(s.d(1),s=null)},d(r){r&&c(e),a.d(),s&&s.d()}}}function ve(n){let e,t,l=n[0]&&Z(n);return{c(){l&&l.c(),e=G()},l(o){l&&l.l(o),e=G()},m(o,a){l&&l.m(o,a),D(o,e,a),t=!0},p(o,[a]){o[0]?l?(l.p(o,a),a&1&&M(l,1)):(l=Z(o),l.c(),M(l,1),l.m(e.parentNode,e)):l&&(de(),Q(l,1,1,()=>{l=null}),_e())},i(o){t||(M(l),t=!0)},o(o){Q(l),t=!1},d(o){o&&c(e),l&&l.d(o)}}}const pe=n=>{n.stopPropagation()};function Ee(n,e,t){let l,{$$slots:o={},$$scope:a}=e;const s=ee("i18n");te(n,s,i=>t(9,l=i));const r=le();let{title:u=""}=e,{message:L=""}=e,{cancelLabel:T=l.t("Cancel")}=e,{confirmLabel:y=l.t("Confirm")}=e,{onConfirm:C=()=>{}}=e,{input:I=!1}=e,{inputPlaceholder:P=""}=e,{inputValue:d=""}=e,{show:k=!1}=e,w=null,j=!1;const V=i=>{i.key==="Escape"&&(console.log("Escape"),t(0,k=!1)),i.key==="Enter"&&(console.log("Enter"),_())},_=async()=>{t(0,k=!1),await C(),r("confirm",d)};ne(()=>{t(14,j=!0)});function z(){d=this.value,t(1,d)}const q=()=>{t(0,k=!1),r("cancel")},m=()=>{_()};function f(i){fe[i?"unshift":"push"](()=>{w=i,t(8,w)})}const h=()=>{t(0,k=!1)};return n.$$set=i=>{"title"in i&&t(2,u=i.title),"message"in i&&t(3,L=i.message),"cancelLabel"in i&&t(4,T=i.cancelLabel),"confirmLabel"in i&&t(5,y=i.confirmLabel),"onConfirm"in i&&t(13,C=i.onConfirm),"input"in i&&t(6,I=i.input),"inputPlaceholder"in i&&t(7,P=i.inputPlaceholder),"inputValue"in i&&t(1,d=i.inputValue),"show"in i&&t(0,k=i.show),"$$scope"in i&&t(15,a=i.$$scope)},n.$$.update=()=>{n.$$.dirty&16641&&j&&(k&&w?(document.body.appendChild(w),window.addEventListener("keydown",V),document.body.style.overflow="hidden"):w&&(window.removeEventListener("keydown",V),document.body.removeChild(w),document.body.style.overflow="unset"))},[k,d,u,L,T,y,I,P,w,l,s,r,_,C,j,a,o,z,q,m,f,h]}class Te extends ue{constructor(e){super(),ce(this,e,Ee,ve,$,{title:2,message:3,cancelLabel:4,confirmLabel:5,onConfirm:13,input:6,inputPlaceholder:7,inputValue:1,show:0})}}export{Te as C};
//# sourceMappingURL=ConfirmDialog.BuoJh2qp.js.map
