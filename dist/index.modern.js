import e,{useState as t,useReducer as r,createContext as s,useContext as n}from"react";function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},o.apply(this,arguments)}const a=()=>{const[e,r]=t({}),s={errors:e,has:t=>e&&!!Object.getOwnPropertyDescriptor(e,t),hasErrors:()=>Object.keys(e).length>0,get:t=>s.has(t)?e[t]:[],first:t=>{var r;return!!s.has(t)&&(null==e||null==(r=e[t])?void 0:r[0])},all:()=>e,add:(t,n)=>{const a=o({},e);s.has(t)||(a[t]=[]),-1===a[t].indexOf(n)&&a[t].push(n),r(a)},set:e=>{r(e)},forget:t=>{if(t){if(e[t]){const s=o({},e);delete s[t],r(s)}}else s.hasErrors()&&r({})}};return s};function i(e,s,n){const i=a(),[c,l]=t(!1),[u,d]=t(!1),[f,p]=t(1),{onUpdateFields:h}=s||{},[v,g]=r((e,t)=>o({},e,t),e),[y,b]=r((e,t)=>o({},e,t),n),O=(e,t=!0)=>{h&&(e=h(e)),g(e),l(t)},m=(e,t)=>{const r={};r[e]=t,O(r,!0),i.forget(e)},x=e=>{b(e)};return{fields:v,setFields:O,setField:m,handleInputChange:e=>t=>{const r=t.currentTarget||t.target,s=r.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(s)?m(e,r instanceof HTMLInputElement&&r.checked):-1!==["number","range"].indexOf(s)?m(e,Number(r.value)):m(e,r.value)},reset:()=>{O(e,!1)},errors:i,isDirty:c,setIsDirty:l,isBusy:u,setIsBusy:d,step:f,setStep:p,validate:async e=>{const t=null==s?void 0:s.validation;if(!t)throw new Error("No validator resolver passed");const r=t.validate(v,e);return 1==r?{passed:!0}:(i.set(r),{passed:!1,error:r})},meta:y,setAllMeta:x,setMeta:(e,t)=>{const r={};r[e]=t,x(r)}}}const c=/*#__PURE__*/s({});function l(){return c}function u({children:t,defaultValues:r,options:s}){const n=i(r,s),o=l();/*#__PURE__*/return e.createElement(o.Provider,{value:n},t)}function d(){return n(l())}class f{}export{l as FormContext,u as FormContextProvider,f as ValidationResolver,i as useForm,d as useFormContext,a as useFormErrors};
