# React-Form-Reducer

A utility of hooks and a context that provide a simpler form field management, in addition to support of frontend validation and backend validation error processing.

> This package is built to work best with TypeScript.

## Install

```bash
npm install react-form-reducer
```

## Usage

A simple way of using this package is by follows

```tsx
import { useForm } from "react-form-reducer";

type FormInterface = {
  name: string;
  email: string;
}

const MyComponent = ()=>{
  // Initialize from hook
  const {
    fields, // the form fields state
    setField, // The field setter
    handleInputChange // The function able to directly handle input/textarea/checkbox changes
  } = useForm<FormInterface>({
    // Default values
    name: '',
    email: ''
  })
  
  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={fields.name}
          //Set field value using setField
          onChange={(e) => {
            setField("name", e.target.value);
          }}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={fields.email}
          //Set field value using handleInputChange
          onChange={handleInputChange("email")}
        />
      </div>
    </form>
  )
}

export default MyComponent;
```

> 🚧 More documentation under way
