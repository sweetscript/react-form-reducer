import React, { ChangeEventHandler } from 'react';
import { ErrorMessages, Rules } from 'validatorjs';
export interface FormHookType<R> {
    fields: R;
    setFields: (fields: R) => void;
    setField: (name: keyof R, value: unknown) => void;
    handleInputChange: (name: keyof R) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    isDirty: boolean;
    setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
    isBusy: boolean;
    setIsBusy: React.Dispatch<React.SetStateAction<boolean>>;
    reset: () => void;
    errors: FormErrorsProps;
    validate: (fields?: Array<keyof R>) => boolean;
}
export type FormContextType<R> = FormHookType<R>;
export type UseFormOptions<T> = {
    onUpdateFields?: (fields: T) => T;
    validationRules?: Rules;
    validationMessages?: ErrorMessages;
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
