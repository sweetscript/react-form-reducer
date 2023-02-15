import { FormHookType, UseFormOptions } from '../types';
/**
 * This is the form state hook
 * @param defaultValues
 * @param options
 */
export default function useForm<T>(defaultValues: T, options?: UseFormOptions<T>): FormHookType<T>;
