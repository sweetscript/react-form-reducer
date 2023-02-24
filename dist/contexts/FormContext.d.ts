import { Context, ReactNode } from 'react';
import { FormContextType, UseFormOptions } from '../types';
export declare function FormContext<IFields, IMeta = never>(): Context<FormContextType<IFields, IMeta>>;
export declare function FormContextProvider<IFields, IMeta = never>({ children, defaultValues, options, defaultMeta }: {
    children: ReactNode;
    defaultValues: IFields;
    options?: UseFormOptions<IFields>;
    defaultMeta?: IMeta;
}): JSX.Element;
