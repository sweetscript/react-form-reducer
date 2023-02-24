import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';
import { FormContextType } from '../types';

/**
 * This hook can be used to easily share form state between child components, useful for stepped forms
 */
export default function useFormContext<IFields, IMeta = never>() {
  return useContext<FormContextType<IFields, IMeta>>(
    FormContext<IFields, IMeta>()
  ) as FormContextType<IFields, IMeta>;
}
