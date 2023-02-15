import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';
import { FormContextType } from '../types';

/**
 * This hook can be used to easily share form state between child components, useful for stepped forms
 */
export default function useFormContext<T>() {
  return useContext<FormContextType<T>>(FormContext<T>()) as FormContextType<T>;
}
