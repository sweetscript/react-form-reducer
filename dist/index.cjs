import React,{useState,useReducer,createContext,useContext}from"react";function _extends(){return _extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_extends.apply(this,arguments)}var useFormErrors=function(){var e=useState({}),t=e[0],r=e[1],n={errors:t,has:function(e){return t&&!!Object.getOwnPropertyDescriptor(t,e)},hasErrors:function(){return Object.keys(t).length>0},get:function(e){return n.has(e)?t[e]:[]},first:function(e){var r;return!!n.has(e)&&(null==t||null==(r=t[e])?void 0:r[0])},all:function(){return t},add:function(e,o){var s=_extends({},t);n.has(e)||(s[e]=[]),-1===s[e].indexOf(o)&&s[e].push(o),r(s)},set:function(e){r(e)},forget:function(e){if(e){if(t[e]){var o=_extends({},t);delete o[e],r(o)}}else n.hasErrors()&&r({})}};return n};function useForm(e,t,r){var n=useFormErrors(),o=useState(!1),s=o[0],u=o[1],a=useState(!1),i=a[0],c=a[1],d=useState(1),f=d[0],l=d[1],v=(t||{}).onUpdateFields,x=useReducer(function(e,t){return _extends({},e,t)},e),m=x[0],p=x[1],F=useReducer(function(e,t){return _extends({},e,t)},r),h=F[1],C=function(e,t){void 0===t&&(t=!0),v&&(e=v(e)),p(e),u(t)},g=function(e,t){var r={};r[e]=t,C(r,!0),n.forget(e)},y=function(e){h(e)};return{fields:m,setFields:C,setField:g,handleInputChange:function(e){return function(t){var r=t.currentTarget||t.target,n=r.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(n)?g(e,r instanceof HTMLInputElement&&r.checked):-1!==["number","range"].indexOf(n)?g(e,Number(r.value)):g(e,r.value)}},reset:function(){C(e,!1)},errors:n,isDirty:s,setIsDirty:u,isBusy:i,setIsBusy:c,step:f,setStep:l,validate:function(e){try{var r=null==t?void 0:t.validation;if(!r)throw new Error("No validator resolver passed");var o=r.validate(m,e);return 1==o?Promise.resolve({passed:!0}):(n.set(o),Promise.resolve({passed:!1,error:o}))}catch(e){return Promise.reject(e)}},meta:F[0],setAllMeta:y,setMeta:function(e,t){var r={};r[e]=t,y(r)}}}var _FormContext=/*#__PURE__*/createContext({});function FormContext(){return _FormContext}function FormContextProvider(e){var t=e.children,r=useForm(e.defaultValues,e.options),n=FormContext();/*#__PURE__*/return React.createElement(n.Provider,{value:r},t)}function useFormContext(){return useContext(FormContext())}var ValidationResolver=function(){};export{FormContext,FormContextProvider,ValidationResolver,useForm,useFormContext,useFormErrors};
