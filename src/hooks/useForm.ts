import { ChangeEventHandler, useReducer, useState } from 'react';
import useFormErrors from './useFormErrors';
import { FormHookType, UseFormOptions } from '../types';

/**
 * This is the form state hook
 * @param defaultValues
 * @param options
 */
export default function useForm<T>(
  defaultValues: T,
  options?: UseFormOptions<T>
): FormHookType<T> {
  const formErrors = useFormErrors();

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const { onUpdateFields } = options || {};

  // Fields state
  const [fields, updateFields] = useReducer((prev: T, next: Partial<T>) => {
    let newFields = { ...prev, ...next };
    if (onUpdateFields) {
      newFields = onUpdateFields(newFields);
    }
    return newFields;
  }, defaultValues);

  // Fields state setters
  const setFields = (values: Partial<T>, setDirty = true) => {
    if (onUpdateFields) {
      values = onUpdateFields(values as T);
    }
    updateFields(values);
    setIsDirty(setDirty);
  };
  const setField = (name: keyof T, value: unknown) => {
    const v: { [key: string]: unknown } = {};
    v[name as string] = value;
    setFields(v as Partial<T>, true);

    //Clear field error if present
    formErrors.forget(name as string);
  };
  const handleInputChange =
    (
      name: keyof T
    ): ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > =>
    (event) => {
      const target = event.currentTarget || event.target;
      const targetType = target.getAttribute('type') || 'text';
      if (['checkbox', 'radio'].indexOf(targetType) !== -1) {
        setField(name, target instanceof HTMLInputElement && target.checked);
      } else if (['number', 'range'].indexOf(targetType) !== -1) {
        setField(name, Number(target.value));
      } else {
        setField(name, target.value);
      }
    };
  const reset = () => {
    setFields(defaultValues, false);
  };

  // Validation logic
  const validate = async (fieldsToCheck?: Array<keyof T>) => {
    const resolver = options?.validation;
    if (!resolver) {
      throw new Error('No validator resolver passed');
    }
    const valid = resolver.validate(fields, fieldsToCheck);
    if (valid == true) {
      return { passed: true };
    }

    formErrors.set(valid);
    return { passed: false, error: valid };
  };

  return {
    fields,
    setFields,
    setField,
    handleInputChange,
    reset,
    errors: formErrors,
    isDirty,
    setIsDirty,
    isBusy,
    setIsBusy,
    step,
    setStep,
    validate
  };
}
