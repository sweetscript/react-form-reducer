import { useState, useReducer, createContext, useContext } from 'react';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/**
 * This hook can be used to easily handle returned validation errors
 */
var useFormErrors = function useFormErrors() {
  var _useState = useState({}),
    errors = _useState[0],
    setErrors = _useState[1];
  var instance = {
    errors: errors,
    /**
     * Determine if there are any error messages for the field
     * @param field
     */
    has: function has(field) {
      return errors && !!Object.getOwnPropertyDescriptor(errors, field);
    },
    /**
     * Determine if form has any errors
     */
    hasErrors: function hasErrors() {
      return Object.keys(errors).length > 0;
    }
  };
  /**
   * Returns an array of error messages for a field, or an empty array
   * @param field
   */
  instance.get = function (field) {
    return instance.has(field) ? errors[field] : [];
  };
  /**
   * Returns the first error message for a field, false otherwise
   */
  instance.first = function (field) {
    var _errors$field;
    return instance.has(field) ? errors == null ? void 0 : (_errors$field = errors[field]) == null ? void 0 : _errors$field[0] : false;
  };
  /**
   * Get all error messages
   */
  instance.all = function () {
    return errors;
  };
  //SETTERS
  /**
   * Add new error message for given field
   * @param field
   * @param message
   */
  instance.add = function (field, message) {
    var newErrors = _extends({}, errors);
    if (!instance.has(field)) {
      newErrors[field] = [];
    }
    if (newErrors[field].indexOf(message) === -1) {
      newErrors[field].push(message);
    }
    setErrors(newErrors);
  };
  /**
   * Set error messages
   */
  instance.set = function (errors) {
    setErrors(errors);
  };
  /**
   * Forget all the errors
   */
  instance.forget = function (field) {
    if (!field) {
      if (instance.hasErrors()) setErrors({});
    } else if (errors[field]) {
      var res = _extends({}, errors);
      delete res[field];
      setErrors(res);
    }
  };
  return instance;
};

/**
 * This is the form state hook
 * @param defaultValues
 * @param options
 */
function useForm(defaultValues, options) {
  var errors = useFormErrors();
  var _useState = useState(false),
    isDirty = _useState[0],
    setIsDirty = _useState[1];
  var _useState2 = useState(false),
    isBusy = _useState2[0],
    setIsBusy = _useState2[1];
  var _useState3 = useState(1),
    step = _useState3[0],
    setStep = _useState3[1];
  var _ref = options || {},
    onUpdateFields = _ref.onUpdateFields;
  // Fields state
  var _useReducer = useReducer(function (prev, next) {
      var newFields = _extends({}, prev, next);
      if (onUpdateFields) {
        newFields = onUpdateFields(newFields);
      }
      return newFields;
    }, defaultValues),
    fields = _useReducer[0],
    updateFields = _useReducer[1];
  // Fields state setters
  var setFields = function setFields(values, setDirty) {
    if (setDirty === void 0) {
      setDirty = true;
    }
    if (onUpdateFields) {
      values = onUpdateFields(values);
    }
    updateFields(values);
    setIsDirty(setDirty);
  };
  var setField = function setField(name, value) {
    var v = {};
    v[name] = value;
    setFields(v, true);
  };
  var handleInputChange = function handleInputChange(name) {
    return function (event) {
      var target = event.currentTarget || event.target;
      if (target.getAttribute('type') == '') {
        setField(name, target instanceof HTMLInputElement && target.checked);
      } else {
        setField(name, target.value);
      }
    };
  };
  var reset = function reset() {
    setFields(defaultValues, false);
  };
  return {
    fields: fields,
    setFields: setFields,
    setField: setField,
    handleInputChange: handleInputChange,
    reset: reset,
    errors: errors,
    isDirty: isDirty,
    setIsDirty: setIsDirty,
    isBusy: isBusy,
    setIsBusy: setIsBusy,
    step: step,
    setStep: setStep
  };
}

var _FormContext = createContext({});
function FormContext() {
  return _FormContext;
}
function FormContextProvider(_ref) {
  var children = _ref.children,
    defaultValues = _ref.defaultValues,
    options = _ref.options;
  var formInstance = useForm(defaultValues, options);
  var Context = FormContext();
  return h(Context.Provider, {
    value: formInstance
  }, children);
}

/**
 * This hook can be used to easily share form state between child components, useful for stepped forms
 */
function useFormContext() {
  return useContext(FormContext());
}

export { FormContext, FormContextProvider, useForm, useFormContext, useFormErrors };
//# sourceMappingURL=index.module.js.map
