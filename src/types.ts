import React from 'react';

export interface FormHookType<R> {
  fields: R;
  setFields: (fields: R) => void;
  setField: (name: keyof R, value: unknown) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  errors: FormErrorsProps;
}

export type FormContextType<R> = FormHookType<R>;

export type UseFormOptions<T> = {
  onUpdateFields: (fields: T) => T;
};

export type Errors = { [key: string]: string[] };

export type FormErrorsProps = {
  errors?: Errors;

  //GETTERS
  has: (field: string) => boolean;
  hasErrors: () => boolean;
  get: (field: string) => any;
  first: (field: string) => string | false;
  all: () => Errors;

  //SETTERS
  add: (field: string, message: string) => void;
  set: (errors: Errors) => void;
  forget: (field?: string) => void;
};
