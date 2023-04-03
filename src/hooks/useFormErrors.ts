import { useState } from 'react';
import { Errors, FormErrorsProps } from '../types';

/**
 * This hook can be used to easily handle returned validation errors
 */
export default function useFormErrors<
  IFields = never
>(): FormErrorsProps<IFields> {
  const [errors, setErrors] = useState<Errors>({});
  return createFormErrors(errors, setErrors);
}

export function createFormErrors<IFields = never>(
  errors: Errors,
  errorSetter?: (value: any) => void
): FormErrorsProps<IFields> {
  const instance = {
    errors: errors,

    /**
     * Determine if there are any error messages for the field
     * @param field
     */
    has: (field: keyof IFields): boolean => {
      return errors && !!Object.getOwnPropertyDescriptor(errors, field);
    },
    /**
     * Determine if there are any error messages for the field
     * @param fields
     */
    hasAny: (fields: Array<keyof IFields>): boolean => {
      if (!errors) return false;
      return (
        fields.filter((field) => {
          return !!Object.getOwnPropertyDescriptor(errors, field);
        }).length > 0
      );
    },

    /**
     * Determine if form has any errors
     */
    hasErrors: (): boolean => {
      return Object.keys(errors).length > 0;
    }
  } as FormErrorsProps<IFields>;

  const setErrors =
    errorSetter ||
    function (value: any) {
      instance.errors = value;
    };

  /**
   * Returns an array of error messages for a field, or an empty array
   * @param field
   */
  instance.get = (field: string | keyof IFields) => {
    return instance.has(field as string) ? errors[field as string] : [];
  };
  /**
   * Returns the first error message for a field, false otherwise
   */
  instance.first = (field: string | keyof IFields) => {
    return instance.has(field as string)
      ? errors?.[field as string]?.[0]
      : null;
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
  instance.add = (field: string | keyof IFields, message: string) => {
    const newErrors: Errors = { ...errors };
    if (!instance.has(field as string)) {
      newErrors[field as string] = [];
    }

    if (newErrors[field as string].indexOf(message) === -1) {
      newErrors[field as string].push(message);
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
  instance.forget = (field?: string | keyof IFields) => {
    if (!field) {
      if (instance.hasErrors()) setErrors({});
    } else if (errors[field as string]) {
      const res = { ...errors };
      delete res[field as string];
      setErrors(res);
    }
  };

  return instance;
}
