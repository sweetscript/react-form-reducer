import t,{useState as r,useReducer as e,createContext as n,useContext as i}from"react";function u(){return u=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},u.apply(this,arguments)}var o=function(){var t=r({}),e=t[0],n=t[1],i={errors:e,has:function(t){return e&&!!Object.getOwnPropertyDescriptor(e,t)},hasErrors:function(){return Object.keys(e).length>0},get:function(t){return i.has(t)?e[t]:[]},first:function(t){var r;return!!i.has(t)&&(null==e||null==(r=e[t])?void 0:r[0])},all:function(){return e},add:function(t,r){var o=u({},e);i.has(t)||(o[t]=[]),-1===o[t].indexOf(r)&&o[t].push(r),n(o)},set:function(t){n(t)},forget:function(t){if(t){if(e[t]){var r=u({},e);delete r[t],n(r)}}else i.hasErrors()&&n({})}};return i};function s(t,n){var i=o(),s=r(!1),a=s[0],c=s[1],f=r(!1),l=f[0],d=f[1],v=r(1),p=v[0],h=v[1],g=(n||{}).onUpdateFields,y=e(function(t,r){var e=u({},t,r);return g&&(e=g(e)),e},t),O=y[1],b=function(t,r){void 0===r&&(r=!0),g&&(t=g(t)),O(t),c(r)},j=function(t,r){var e={};e[t]=r,b(e,!0)};return{fields:y[0],setFields:b,setField:j,handleInputChange:function(t){return function(r){var e=r.currentTarget||r.target,n=e.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(n)?j(t,e instanceof HTMLInputElement&&e.checked):j(t,e.value)}},reset:function(){b(t,!1)},errors:i,isDirty:a,setIsDirty:c,isBusy:l,setIsBusy:d,step:p,setStep:h}}var a=/*#__PURE__*/n({});function c(){return a}function f(r){var e=r.children,n=s(r.defaultValues,r.options),i=c();/*#__PURE__*/return t.createElement(i.Provider,{value:n},e)}function l(){return i(c())}export{c as FormContext,f as FormContextProvider,s as useForm,l as useFormContext,o as useFormErrors};
//# sourceMappingURL=index.module.js.map
