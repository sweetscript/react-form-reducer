import t,{useState as e,useReducer as r,createContext as n,useContext as s}from"react";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}const i=()=>{const[t,r]=e({}),n={errors:t,has:e=>t&&!!Object.getOwnPropertyDescriptor(t,e),hasErrors:()=>Object.keys(t).length>0,get:e=>n.has(e)?t[e]:[],first:e=>{var r;return!!n.has(e)&&(null==t||null==(r=t[e])?void 0:r[0])},all:()=>t,add:(e,s)=>{const i=o({},t);n.has(e)||(i[e]=[]),-1===i[e].indexOf(s)&&i[e].push(s),r(i)},set:t=>{r(t)},forget:e=>{if(e){if(t[e]){const n=o({},t);delete n[e],r(n)}}else n.hasErrors()&&r({})}};return n};function c(t,n){const s=i(),[c,a]=e(!1),[u,l]=e(!1),[d,f]=e(1),{onUpdateFields:p}=n||{},[h,g]=r((t,e)=>{let r=o({},t,e);return p&&(r=p(r)),r},t),y=(t,e=!0)=>{p&&(t=p(t)),g(t),a(e)},O=(t,e)=>{const r={};r[t]=e,y(r,!0)};return{fields:h,setFields:y,setField:O,handleInputChange:t=>e=>{const r=e.currentTarget||e.target,n=r.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(n)?O(t,r instanceof HTMLInputElement&&r.checked):O(t,r.value)},reset:()=>{y(t,!1)},errors:s,isDirty:c,setIsDirty:a,isBusy:u,setIsBusy:l,step:d,setStep:f}}const a=/*#__PURE__*/n({});function u(){return a}function l({children:e,defaultValues:r,options:n}){const s=c(r,n),o=u();/*#__PURE__*/return t.createElement(o.Provider,{value:s},e)}function d(){return s(u())}export{u as FormContext,l as FormContextProvider,c as useForm,d as useFormContext,i as useFormErrors};
//# sourceMappingURL=index.modern.js.map
