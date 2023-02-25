# React-Form-Reducer

A utility of React hooks and a context that provide a simpler form field management, in addition to support of frontend validation and backend validation error processing. The library uses the React built-in reducers and context with no dependencies to achieve a typescript oriented way of managing form state efficiently and heling developers with autosuggestion of form fields in both setters and getters.

	> This package works best with **TypeScript**

![npm](https://img.shields.io/npm/v/react-form-reducer)
![Snyk Vulnerabilities for npm package version](https://img.shields.io/snyk/vulnerabilities/npm/react-form-reducer)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-form-reducer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-reducer)

## Install

```bash
npm install react-form-reducer
```

## Simple Usage

A simple way of using this package is as follows:

```tsx
import { useForm } from "react-form-reducer";

// Define your form body type
type FormInterface = {
  name: string;
  email: string;
}

const MyComponent = ()=>{

  // Initialize from hook
  const { fields, assignFieldInput } = useForm<FormInterface>({
    name: '', // Default values
    email: ''
  })
  
  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...assignFieldInput('name')}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...assignFieldInput('email')}
        />
      </div>
    </form>
  )
}

export default MyComponent;
```

---

## Examples

### Simple Form:

Example using `useHook`

> [![Edit react-form-reducer--simple-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--simple-demo-ny7bre?fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark)

### 2. Stepped Form:

Example using `FormContextProvider` and `useFormContext`

> [![Edit react-form-reducer--stepped-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--stepped-demo-u78iqp?fontsize=12&hidenavigation=1&module=%2Fsrc%2Fsteps%2FMyForm.tsx&theme=dark)

---

## Documentation
This library provides both a hook and context, the `useForm` hook can be used for single component forms, and `useFormContext`


## `useForm` hook

This hook can be used for single component forms, and has plenty of usefull states and actions:

```tsx
const {
  //Fields state
  fields,
  //Fields state setters
  setField,
  setFields,
  handleInputChange,
  assignFieldInput,
  assignFieldUI,
  reset,

  // Utility states
  isDirty,
  setIsDirty,
  isBusy,
  setIsBusy,
  step,
  setStep,

  // Validation errors = useFormErrors()
  errors,
  // Validate trigger
  validate,

  //  Meta Data State
  meta,
  setMeta,
  setAllMeta
} = useForm<MyFormInterface>({
  ...default values go here
}, {
  onUpdateFields: (data)=> {} //optional config
  validation: new Resolver //optional config
});
```

___

## Context Provider : `useFormContext` & `FormContextProvider`

The context provider and hook are helpful for when sharing the form state between multiple components (for example: A multi-step form).

1. ### Setting up provider context

```
const WrapperComponent = ()=>{
  const FormProvider = FormContextProvider<MyFormInterface>;
  return (
    <FormProvider
      defaultValues={{
        email: '',
        name: '',
        type: '',
        terms: false
      }}
      options={{
        validation: new Resolver({
          email: 'required|email',
          name: 'required',
          type: 'required',
          terms: 'accepted'
        })
      }}
    >
      <MyFormComponent />
    </FormProvider>
  );
}
```


2. ### Usage of `useFormContext`
   This hook will return the same properties as useHook, make sure its called inside the context provider you setup before:
```
const MyFormComponent = ()=>{
  const { fields } = useFormContext<MyFormInterface>();

  return (....);
}
```
___

## Errors: `useFormErrors` Validation errors handling hook

This hooks is provided as a property in the previous hooks, but can also be used on its own.

## Validation

To use validation on form fields, you need to install the resolver library [`react-form-reducer-validator`](https://github.com/sweetscript/react-form-reducer-validator):

```
npm i react-form-reducer-validator
```

The resolver wraps the [`validatorjs`](https://www.npmjs.com/package/validatorjs) library to be used for validation, the library allows for a neat & simple way of adding validation. and also the resolver allows for partial validation which is useful for stepped forms


```tsx
import { Resolver } from 'react-form-reducer-validator';

type MyValidatedFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
};

export function ValidatedForm() {
  const { 
    fields,
    handleInputChange, 
    validate,
    errors
  } = useForm<MyValidatedFormType>(
    {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false
    },
    {
        validation: new Resolver(
          {
            name: 'required',
            email: 'required|email',
            password: 'required',
            password_confirmation: 'required|same:password',
            terms: 'accepted'
          },
          {
            'accepted.terms': 'Please accept the :attribute',
            'same.password_confirmation': "Passwords don't match"
          }
        )
      }
    );


    const handleSubmit = async ()=>{
      const { passed } = await validate()

      if(!passed){
        // throw error
      }
    }
}

```

### Validation Examples

#### Simple Validation Form

[![Edit react-form-reducer--validation-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--validation-demo-vmhtdr?fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark)

#### Partial validation in a context form (stepped form)

[![Edit react-form-reducer--stepped-validation-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--stepped-validation-demo-gkehzf?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fsteps%2FMyForm.tsx&theme=dark)

Further documentation on the validation resolver can be found on its repo: [https://github.com/sweetscript/react-form-reducer-validator](https://github.com/sweetscript/react-form-reducer-validator)




## Backend validation errors

To process the errors returned from the backend you can use the `useFormErrors` hook, as long as they're in the suitable format.



## Contribution ![GitHub issues](https://img.shields.io/github/issues/sweetscript/react-form-reducer)

Feedback, Issue reports, suggestions and contributions are appreciated and welcome.

[https://github.com/sweetscript/react-form-reducer/issues](https://github.com/sweetscript/react-form-reducer/issues)

[https://github.com/sweetscript/react-form-reducer/discussions](https://github.com/sweetscript/react-form-reducer/discussions)

[majid@sweetscript.com](mailto:majid@sweetscript.com)

