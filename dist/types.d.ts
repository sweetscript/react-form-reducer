import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
export interface FormHookType<IFields, IMeta = never> {
    fields: IFields;
    setFields: (fields: IFields) => void;
    setField: (name: keyof IFields, value: unknown) => void;
    handleInputChange: (name: keyof IFields) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    assignFieldInput: (name: keyof IFields) => AssignFieldInput;
    assignFieldUI: (name: keyof IFields) => AssignFieldUI;
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    isDirty: boolean;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    isBusy: boolean;
    setIsBusy: Dispatch<SetStateAction<boolean>>;
    reset: () => void;
    errors: FormErrorsProps;
    validate: (fieldsToCheck?: Array<keyof IFields>) => Promise<FormValidateResponse>;
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
export type FormErrorsProps<IFields = never> = {
    errors?: Errors;
    has: (field: keyof IFields | string) => boolean;
    hasErrors: () => boolean;
    get: (field: keyof IFields | string) => any;
    first: (field: keyof IFields | string) => keyof IFields | string | false;
    all: () => Errors;
    add: (field: keyof IFields | string, message: keyof IFields | string) => void;
    set: (errors: Errors) => void;
    forget: (field?: keyof IFields | string) => void;
};
export declare abstract class ValidationResolver<T> {
    abstract validate(data: T, fieldsToCheck?: Array<keyof T>): true | Errors;
}
export type AssignFieldInput = {
    onChange: ChangeEventHandler<HTMLElement>;
    value: any;
    disabled: boolean;
};
export type AssignFieldUI = AssignFieldInput & {
    error?: boolean;
    helperText?: boolean;
};
