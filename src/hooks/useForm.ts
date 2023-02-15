import { useReducer, useState } from 'react';
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
  const errors = useFormErrors();

  const [isDirty, setIsDirty] = useState<boolean>(false);

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
    updateFields(values);
    setIsDirty(setDirty);
  };
  const setField = (name: keyof T, value: unknown) => {
    const v: { [key: string]: unknown } = {};
    v[name as string] = value;
    setFields(v as Partial<T>, true);
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
