import React from "react";

function FormInput({ label, type, name, required, formikConfig }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          {...formikConfig}
          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-science-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default FormInput;
