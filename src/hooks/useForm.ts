import { ChangeEventHandler, useReducer, useState } from 'react';
import useFormErrors from './useFormErrors';
import { FormHookType, UseFormOptions } from '../types';

/**
 * This is the form state hook
 * @param defaultValues
 * @param options
 * @param defaultMeta
 */
export default function useForm<IFields, IMeta = never>(
  defaultValues: IFields,
  options?: UseFormOptions<IFields>,
  defaultMeta?: IMeta
): FormHookType<IFields, IMeta> {
  const formErrors = useFormErrors();

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const { onUpdateFields } = options || {};

  // Fields state
  const [fields, updateFields] = useReducer(
    (prev: IFields, next: Partial<IFields>) => {
      return { ...prev, ...next };
    },
    defaultValues
  );
  // Meta state
  const [meta, updateMeta] = useReducer((prev: IMeta, next: Partial<IMeta>) => {
    return { ...prev, ...next };
  }, defaultMeta as IMeta);

  // Fields state setters
  const setFields = (values: Partial<IFields>, setDirty = true) => {
    if (onUpdateFields) {
      values = onUpdateFields(values as IFields);
    }
    updateFields(values);
    setIsDirty(setDirty);
  };
  const setField = (name: keyof IFields, value: unknown) => {
    const v: { [key: string]: unknown } = {};
    v[name as string] = value;
    setFields(v as Partial<IFields>, true);

    //Clear field error if present
    formErrors.forget(name as string);
  };
  const handleInputChange =
    (
      name: keyof IFields
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

  // Meta state setters
  const setAllMeta = (values: Partial<IMeta>) => {
    updateMeta(values);
  };
  const setMeta = (name: keyof IMeta, value: unknown) => {
    const v: { [key: string]: unknown } = {};
    v[name as string] = value;
    setAllMeta(v as Partial<IMeta>);
  };

  // Validation logic
  const validate = async (fieldsToCheck?: Array<keyof IFields>) => {
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
    validate,

    meta,
    setAllMeta,
    setMeta
  };
}
