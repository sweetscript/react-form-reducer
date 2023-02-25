# React-Form-Reducer 💫

A utility of React hooks and a context that provide a simpler form field management, in addition to support of frontend validation and backend validation error processing. The library uses the React built-in reducers and context with no dependencies to achieve a typescript oriented way of managing form state efficiently and heling developers with autosuggestion of form fields in both setters and getters.

	> This package works best with TypeScript

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

### 1. Simple Form:

Example using `useHook`

> [![Edit react-form-reducer--simple-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--simple-demo-ny7bre?fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark)

### 2. Stepped Form:

Example using `FormContextProvider` and `useFormContext`

> [![Edit react-form-reducer--stepped-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--stepped-demo-u78iqp?fontsize=12&hidenavigation=1&module=%2Fsrc%2Fsteps%2FMyForm.tsx&theme=dark)


### 3. Simple Validation Form

> [![Edit react-form-reducer--validation-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--validation-demo-vmhtdr?fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark)

### 4. Partial validation in a context form (stepped form)

> [![Edit react-form-reducer--stepped-validation-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-reducer--stepped-validation-demo-gkehzf?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fsteps%2FMyForm.tsx&theme=dark)


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

  //  Meta Data State
  meta,
  setMeta,
  setAllMeta

  // Validate trigger
  validate,

  // Validation errors = useFormErrors()
  errors,

} = useForm<
	MyFormInterface,
	MyMetaInterface //optional, only required if you use the meta state
>({

  ...default values go here

},
{

  //here goes the options // optional
  onUpdateFields: (data)=> {} //optional config
  validation: new Resolver //optional config

},
{ 
  //meta default values // optional, only if you wish to use the meta state
  metafield: 'default',
	....
});
```

### Properties  of `useHook` & `useFormContext`

- #### `fields`

  The state object of form body ()


- #### `setField('name', value)`

  This can be used to sets a field value by name


- #### `setFields(data, isDirty?: boolean = true)`

  This can be used to sets all the fields values at once

  > If you wish set a few values only instead of all field values do the following:

  > `setFields({...fields, name: 'Jane', surname: 'Doe'})`


- #### `handleInputChange('name')`

  This can be used to directly handle ChangeEvents on HTML form elements, and automaticly assign the new values to the fields.


- #### `assignFieldInput('name')`

  This can be used to directly assign all usefull attributes to HTML form elements (input,textarea,select), this function will return an object with values for element attribute: `value`, `onChange` and `disabled`, so it can be simply used this way on an input:
  ```
  <input
    type="text"
    {...assignFieldInput("email")}
  />
  ```


- #### `assignFieldUI('name')`

  This is similar to `assignFieldInput` but returns additional properties `error` & `helperText`, this is usefull for UI components that support those properties like MUI and :
  ```
  <TextField
    {... assignFieldUI("email")}
  />
  ```


- #### `reset()`

  This will reset all the field values to the default values



- #### `isDirty` & `setIsDirty`

  This state can be used to detect if the user made changes to the field values and handle it.

- #### `isBusy` & `setIsBusy`

  This state can be used to handle the loading and disabled logic, this state has to be set and reset as part of your form submission logic.

- #### `step` & `setStep`

  This state that can be usefyll when handling stepped forms.


- #### `meta` & `setMeta` & `setAllMeta`

  This state is similar to the fields state, but isn't part of the validation of reset logic, can be usefull for when storing extra data that is used accross components but not passed with the form submission.


- #### `validate(fieldsToCheck?: string[])`

  This is the trigger for running hte validation, not passing any fields will trigger a full validation on all fields, otherwise if you pass an array of field names it will do a partial validation for them. More info on how to setup validation rules this can be found below in the [validation section](#validation).


- #### `errors`

  This is property that returns the `useFormErrors` hook used by the form hook, the form hook will use this to process frontend validation errors, but you use it outside to process BackEnd errors outside the hook, more info on how to use this in the [useFormErrors section](#useformerrors-a-hook-that-handles-errors) below.


### Options for `useHook` & `FormContextProvider`

You can pass these options to the hook and context provider:

- #### `onUpdateFields: (data)=>data`

  This option is an event option that allows you to manipulate the fields state data everytime they are updated.


- #### `validation: new Resolver(...)`

  This option allows you to pass a validation resolver to provide the ability of validating fields, more info about this can be found in the [validation section](#validation).




---

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
   This hook will return the same properties as `useHoo`k, just make sure you call this hook inside the context provider you setup before:
```
const MyFormComponent = ()=>{
  // This can be called on any child components under the context provider
  const { fields } = useFormContext<MyFormInterface>();

  return (....);
}
```

---

## `useFormErrors` a hook that handles errors

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


Further documentation on the validation resolver can be found on its repo: [https://github.com/sweetscript/react-form-reducer-validator](https://github.com/sweetscript/react-form-reducer-validator)



## Backend validation errors

To process the errors returned from the backend you can use the `useFormErrors` hook, as long as they're in the suitable format.



## Contribution ![GitHub issues](https://img.shields.io/github/issues/sweetscript/react-form-reducer)

Feedback, Issue reports, suggestions and contributions are appreciated and welcome.

[https://github.com/sweetscript/react-form-reducer/issues](https://github.com/sweetscript/react-form-reducer/issues)

[https://github.com/sweetscript/react-form-reducer/discussions](https://github.com/sweetscript/react-form-reducer/discussions)

[majid@sweetscript.com](mailto:majid@sweetscript.com)

