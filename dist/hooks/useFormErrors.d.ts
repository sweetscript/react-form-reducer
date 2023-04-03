import { Errors, FormErrorsProps } from '../types';
/**
 * This hook can be used to easily handle returned validation errors
 */
export default function useFormErrors<IFields = never>(): FormErrorsProps<IFields>;
export declare function createFormErrors<IFields = never>(errors: Errors, errorSetter?: (value: any) => void): FormErrorsProps<IFields>;
