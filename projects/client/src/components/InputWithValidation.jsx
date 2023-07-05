import React from "react";

function InputWithValidation({
  name,
  placeholder,
  classname,
  touched,
  error,
  formikConfig,
  type,
}) {
  return (
    <div className="mb-3 flex flex-col">
      <input
        name={name}
        className={`rounded-md border border-black px-3 py-1 ${classname}`}
        placeholder={placeholder}
        type={type}
        {...formikConfig}
      />
      {touched && error ? <span className="text-red-500">{error}</span> : null}
    </div>
  );
}

export default InputWithValidation;
