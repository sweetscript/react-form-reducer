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
const useFormErrors = () => {
  const [errors, setErrors] = useState({});
  const instance = {
    errors: errors,
    /**
     * Determine if there are any error messages for the field
     * @param field
     */
    has: field => {
      return errors && !!Object.getOwnPropertyDescriptor(errors, field);
    },
    /**
     * Determine if form has any errors
     */
    hasErrors: () => {
      return Object.keys(errors).length > 0;
    }
  };
  /**
   * Returns an array of error messages for a field, or an empty array
   * @param field
   */
  instance.get = field => {
    return instance.has(field) ? errors[field] : [];
  };
  /**
   * Returns the first error message for a field, false otherwise
   */
  instance.first = field => {
    var _errors$field;
    return instance.has(field) ? errors == null ? void 0 : (_errors$field = errors[field]) == null ? void 0 : _errors$field[0] : false;
  };
  /**
   * Get all error messages
   */
  instance.all = () => {
    return errors;
  };
  //SETTERS
  /**
   * Add new error message for given field
   * @param field
   * @param message
   */
  instance.add = (field, message) => {
    const newErrors = _extends({}, errors);
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
  instance.set = errors => {
    setErrors(errors);
  };
  /**
   * Forget all the errors
   */
  instance.forget = field => {
    if (!field) {
      if (instance.hasErrors()) setErrors({});
    } else if (errors[field]) {
      const res = _extends({}, errors);
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
  const errors = useFormErrors();
  const [isDirty, setIsDirty] = useState(false);
  const [step, setStep] = useState(1);
  const {
    onUpdateFields
  } = options || {};
  // Fields state
  const [fields, updateFields] = useReducer((prev, next) => {
    let newFields = _extends({}, prev, next);
    if (onUpdateFields) {
      newFields = onUpdateFields(newFields);
    }
    return newFields;
  }, defaultValues);
  // Fields state setters
  const setFields = (values, setDirty = true) => {
    updateFields(values);
    setIsDirty(setDirty);
  };
  const setField = (name, value) => {
    const v = {};
    v[name] = value;
    setFields(v, true);
  };
  const reset = () => {
    setFields(defaultValues);
  };
  return {
    fields,
    setFields,
    setField,
    reset,
    errors,
    isDirty,
    setIsDirty,
    step,
    setStep
  };
}

const _FormContext = createContext({});
function FormContext() {
  return _FormContext;
}
function FormContextProvider({
  children,
  defaultValues,
  options
}) {
  const formInstance = useForm(defaultValues, options);
  const Context = FormContext();
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
//# sourceMappingURL=index.modern.js.map
