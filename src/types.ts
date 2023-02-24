import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

// export interface FormHookType<R, M = never> {
export interface FormHookType<IField, IMeta = never> {
  fields: IField;
  setFields: (fields: IField) => void;
  setField: (name: keyof IField, value: unknown) => void;
  handleInputChange: (
    name: keyof IField
  ) => ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isDirty: boolean;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  isBusy: boolean;
  setIsBusy: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  errors: FormErrorsProps;

  // Validation
  validate: (
    fieldsToCheck?: Array<keyof IField>
  ) => Promise<FormValidateResponse>;

  meta: IMeta;
  setAllMeta: (metaData: IMeta) => void;
  setMeta: (name: keyof IMeta, value: unknown) => void;
}

export type FormContextType<IFields, IMeta = never> = FormHookType<
  IFields,
  IMeta
>;

export type UseFormOptions<IFields> = {
  onUpdateFields?: (fields: IFields) => IFields;

  validation?: ValidationResolver<IFields>;
};

export type FormValidateResponse = { passed: boolean; errors?: Errors };

export type Errors = { [key: string]: string[] };

export type FormErrorsProps<IFields extends { [key: string]: never } = never> =
  {
    errors?: Errors;

    //GETTERS
    has: (field: keyof IFields | string) => boolean;
    hasErrors: () => boolean;
    get: (field: keyof IFields | string) => any;
    first: (field: keyof IFields | string) => keyof IFields | string | false;
    all: () => Errors;

    //SETTERS
    add: (
      field: keyof IFields | string,
      message: keyof IFields | string
    ) => void;
    set: (errors: Errors) => void;
    forget: (field?: keyof IFields | string) => void;
  };

export abstract class ValidationResolver<T> {
  abstract validate(data: T, fieldsToCheck?: Array<keyof T>): true | Errors;
}
