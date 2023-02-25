var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=/*#__PURE__*/t(e);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},n.apply(this,arguments)}function o(){var t=e.useState({}),r=t[0],o=t[1],u={errors:r,has:function(e){return r&&!!Object.getOwnPropertyDescriptor(r,e)},hasErrors:function(){return Object.keys(r).length>0},get:function(e){return u.has(e)?r[e]:[]},first:function(e){var t;return u.has(e)?null==r||null==(t=r[e])?void 0:t[0]:null},all:function(){return r},add:function(e,t){var s=n({},r);u.has(e)||(s[e]=[]),-1===s[e].indexOf(t)&&s[e].push(t),o(s)},set:function(e){o(e)},forget:function(e){if(e){if(r[e]){var t=n({},r);delete t[e],o(t)}}else u.hasErrors()&&o({})}};return u}function u(t,r,u){var s=o(),i=e.useState(!1),a=i[0],c=i[1],l=e.useState(!1),f=l[0],d=l[1],v=e.useState(1),p=v[0],h=v[1],x=(r||{}).onUpdateFields,g=e.useReducer(function(e,t){return n({},e,t)},t),m=g[0],b=g[1],y=e.useReducer(function(e,t){return n({},e,t)},u),F=y[1],O=function(e,t){void 0===t&&(t=!0),x&&(e=x(e)),b(e),c(t)},j=function(e,t){var r={};r[e]=t,O(r,!0),s.forget(e)},C=function(e){return function(t){var r=t.currentTarget||t.target,n=r.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(n)?j(e,r instanceof HTMLInputElement&&r.checked):-1!==["number","range"].indexOf(n)?j(e,Number(r.value)):j(e,r.value)}},P=function(e){return{onChange:C(e),value:null==m?void 0:m[e],disabled:f}},E=function(e){F(e)};return{fields:m,setFields:O,setField:j,handleInputChange:C,assignFieldInput:P,assignFieldUI:function(e){return n({},P(e),{error:s.has(e),helperText:s.first(e)||void 0})},reset:function(){O(t,!1)},errors:s,isDirty:a,setIsDirty:c,isBusy:f,setIsBusy:d,step:p,setStep:h,validate:function(e){try{var t=null==r?void 0:r.validation;if(!t)throw new Error("No validator resolver passed");var n=t.validate(m,e);return 1==n?Promise.resolve({passed:!0}):(s.set(n),Promise.resolve({passed:!1,error:n}))}catch(e){return Promise.reject(e)}},meta:y[0],setAllMeta:E,setMeta:function(e,t){var r={};r[e]=t,E(r)}}}var s=/*#__PURE__*/e.createContext({});function i(){return s}exports.FormContext=i,exports.FormContextProvider=function(e){var t=e.children,n=u(e.defaultValues,e.options,e.defaultMeta),o=i();/*#__PURE__*/return r.default.createElement(o.Provider,{value:n},t)},exports.ValidationResolver=function(){},exports.useForm=u,exports.useFormContext=function(){return e.useContext(i())},exports.useFormErrors=o;
