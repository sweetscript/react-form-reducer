import { useState } from 'react';
import { Errors, FormErrorsProps } from '../types';

/**
 * This hook can be used to easily handle returned validation errors
 */
const useFormErrors = (): FormErrorsProps => {
  const [errors, setErrors] = useState<Errors>({});
  const instance = {
    errors: errors,

    /**
     * Determine if there are any error messages for the field
     * @param field
     */
    has: (field: string) => {
      return errors && !!Object.getOwnPropertyDescriptor(errors, field);
    },

    /**
     * Determine if form has any errors
     */
    hasErrors: () => {
      return Object.keys(errors).length > 0;
    }
  } as FormErrorsProps;

  /**
   * Returns an array of error messages for a field, or an empty array
   * @param field
   */
  instance.get = (field: string) => {
    return instance.has(field) ? errors[field] : [];
  };
  /**
   * Returns the first error message for a field, false otherwise
   */
  instance.first = (field: string) => {
    return instance.has(field) ? errors?.[field]?.[0] : false;
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
  instance.add = (field: string, message: string) => {
    const newErrors: Errors = { ...errors };
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
  instance.set = (errors: Errors) => {
    setErrors(errors);
  };

  /**
   * Forget all the errors
   */
  instance.forget = (field?: string) => {
    if (!field) {
      if (instance.hasErrors()) setErrors({});
    } else if (errors[field]) {
      const res = { ...errors };
      delete res[field];
      setErrors(res);
    }
  };

  return instance;
};

export default useFormErrors;
