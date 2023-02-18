import React, { Context, createContext, ReactNode } from 'react';
import { FormContextType, UseFormOptions } from '../types';
import useForm from '../hooks/useForm';

const _FormContext = createContext<object>({});

export function FormContext<T>(): Context<FormContextType<T>> {
  return _FormContext as Context<FormContextType<T>>;
}

export function FormContextProvider<T>({
  children,
  defaultValues,
  options
}: {
  children: ReactNode;
  defaultValues: T;
  options?: UseFormOptions<T>;
}) {
  const formInstance = useForm<T>(defaultValues, options);

  const Context = FormContext<T>();

  return <Context.Provider value={formInstance}>{children}</Context.Provider>;
}
