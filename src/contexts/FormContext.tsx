import React, { Context, createContext, ReactNode } from 'react';
import { FormContextType, UseFormOptions } from '../types';
import useForm from '../hooks/useForm';

const _FormContext = createContext<object>({});

export function FormContext<IFields, IMeta = never>(): Context<
  FormContextType<IFields, IMeta>
> {
  return _FormContext as Context<FormContextType<IFields, IMeta>>;
}

export function FormContextProvider<IFields, IMeta = never>({
  children,
  defaultValues,
  options,
  defaultMeta
}: {
  children: ReactNode;
  defaultValues: IFields;
  options?: UseFormOptions<IFields>;
  defaultMeta?: IMeta;
}) {
  const formInstance = useForm<IFields, IMeta>(
    defaultValues,
    options,
    defaultMeta
  );

  const Context = FormContext<IFields, IMeta>();

  return <Context.Provider value={formInstance}>{children}</Context.Provider>;
}
