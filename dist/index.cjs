var e=require("react"),t=require("validatorjs");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=/*#__PURE__*/r(e),u=/*#__PURE__*/r(t);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}var a=function(){var t=e.useState({}),r=t[0],n=t[1],u={errors:r,has:function(e){return r&&!!Object.getOwnPropertyDescriptor(r,e)},hasErrors:function(){return Object.keys(r).length>0},get:function(e){return u.has(e)?r[e]:[]},first:function(e){var t;return!!u.has(e)&&(null==r||null==(t=r[e])?void 0:t[0])},all:function(){return r},add:function(e,t){var a=o({},r);u.has(e)||(a[e]=[]),-1===a[e].indexOf(t)&&a[e].push(t),n(a)},set:function(e){n(e)},forget:function(e){if(e){if(r[e]){var t=o({},r);delete t[e],n(t)}}else u.hasErrors()&&n({})}};return u};function s(t,r){var n=a(),s=e.useState(!1),i=s[0],f=s[1],c=e.useState(!1),l=c[0],d=c[1],v=e.useState(1),p=v[0],h=v[1],x=e.useState((null==r?void 0:r.validationRules)||{})[0],g=e.useState((null==r?void 0:r.validationMessages)||{})[0],b=(r||{}).onUpdateFields,y=e.useReducer(function(e,t){var r=o({},e,t);return b&&(r=b(r)),r},t),O=y[0],m=y[1],F=function(e,t){void 0===t&&(t=!0),b&&(e=b(e)),m(e),f(t)},j=function(e,t){var r={};r[e]=t,F(r,!0),n.forget(e)};return{fields:O,setFields:F,setField:j,handleInputChange:function(e){return function(t){var r=t.currentTarget||t.target,n=r.getAttribute("type")||"text";-1!==["checkbox","radio"].indexOf(n)?j(e,r instanceof HTMLInputElement&&r.checked):-1!==["number","range"].indexOf(n)?j(e,Number(r.value)):j(e,r.value)}},reset:function(){F(t,!1)},errors:n,isDirty:i,setIsDirty:f,isBusy:l,setIsBusy:d,step:p,setStep:h,validate:function(e){var t=O;if(e)for(var r in t={},O)e.indexOf(r)&&(t[r]=O[r]);var o=new u.default(t,x,g);if(o.passes())return!0;var a=o.errors.all();return n.set(a),!1}}}var i=/*#__PURE__*/e.createContext({});function f(){return i}exports.FormContext=f,exports.FormContextProvider=function(e){var t=e.children,r=s(e.defaultValues,e.options),u=f();/*#__PURE__*/return n.default.createElement(u.Provider,{value:r},t)},exports.useForm=s,exports.useFormContext=function(){return e.useContext(f())},exports.useFormErrors=a;
//# sourceMappingURL=index.cjs.map
