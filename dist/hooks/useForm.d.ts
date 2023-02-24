import { FormHookType, UseFormOptions } from '../types';
/**
 * This is the form state hook
 * @param defaultValues
 * @param options
 * @param defaultMeta
 */
export default function useForm<IFields, IMeta = never>(defaultValues: IFields, options?: UseFormOptions<IFields>, defaultMeta?: IMeta): FormHookType<IFields, IMeta>;
