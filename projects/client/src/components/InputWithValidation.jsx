import React from "react";
import FormInput from "./FormInput";

function InputWithValidation({
  name,
  touched,
  error,
  formikConfig,
  label,
  type,
  required,
}) {
  return (
    <div>
      <FormInput
        label={label}
        name={name}
        required={required}
        type={type}
        formikConfig={formikConfig}
      />
      {touched && error ? <p className="text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}

export default InputWithValidation;
