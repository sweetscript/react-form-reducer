import { ChangeEventHandler, useReducer, useState } from 'react';
import useFormErrors from './useFormErrors';
import { FormHookType, UseFormOptions } from '../types';
import Validator, { Rules } from 'validatorjs';

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
  function validate(fieldsToCheck?: Array<keyof T>) {
    let rules: { [key: string]: unknown } = options?.validationRules || {};
    let validateFields: { [key: string]: unknown } = fields;
    if (fieldsToCheck) {
      validateFields = {};
      const fieldRules: { [key: string]: unknown } = {};
      for (const fieldKey in fields) {
        if (fieldsToCheck.indexOf(fieldKey) !== -1) {
          validateFields[fieldKey] = fields[fieldKey];
          if (rules[fieldKey]) {
            fieldRules[fieldKey] = rules[fieldKey];
          }
        }
      }
      rules = fieldRules;
    }
    const validation = new Validator(
      validateFields,
      rules as Rules,
      options?.validationMessages
    );
    const pass = validation.passes();
    if (pass) return true;
    const errors = validation.errors.all();
    formErrors.set(errors);
    return false;
  }

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
