import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
export interface FormHookType<IField, IMeta = never> {
    fields: IField;
    setFields: (fields: IField) => void;
    setField: (name: keyof IField, value: unknown) => void;
    handleInputChange: (name: keyof IField) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    isDirty: boolean;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    isBusy: boolean;
    setIsBusy: Dispatch<SetStateAction<boolean>>;
    reset: () => void;
    errors: FormErrorsProps;
    validate: (fieldsToCheck?: Array<keyof IField>) => Promise<FormValidateResponse>;
    meta: IMeta;
    setAllMeta: (metaData: IMeta) => void;
    setMeta: (name: keyof IMeta, value: unknown) => void;
}
export type FormContextType<IFields, IMeta = never> = FormHookType<IFields, IMeta>;
export type UseFormOptions<IFields> = {
    onUpdateFields?: (fields: IFields) => IFields;
    validation?: ValidationResolver<IFields>;
};
export type FormValidateResponse = {
    passed: boolean;
    errors?: Errors;
};
export type Errors = {
    [key: string]: string[];
};
export type FormErrorsProps = {
    errors?: Errors;
    has: (field: string) => boolean;
    hasErrors: () => boolean;
    get: (field: string) => any;
    first: (field: string) => string | false;
    all: () => Errors;
    add: (field: string, message: string) => void;
    set: (errors: Errors) => void;
    forget: (field?: string) => void;
};
export declare abstract class ValidationResolver<T> {
    abstract validate(data: T, fieldsToCheck?: Array<keyof T>): true | Errors;
}
