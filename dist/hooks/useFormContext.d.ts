import { FormContextType } from '../types';
/**
 * This hook can be used to easily share form state between child components, useful for stepped forms
 */
export default function useFormContext<IFields, IMeta = never>(): FormContextType<IFields, IMeta>;
