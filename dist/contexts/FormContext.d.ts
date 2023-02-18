import { Context, ReactNode } from 'react';
import { FormContextType, UseFormOptions } from '../types';
export declare function FormContext<T>(): Context<FormContextType<T>>;
export declare function FormContextProvider<T>({ children, defaultValues, options }: {
    children: ReactNode;
    defaultValues: T;
    options?: UseFormOptions<T>;
}): JSX.Element;
