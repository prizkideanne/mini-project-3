import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputWithValidation from "../components/InputWithValidation";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      storeName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("This field is required")
        .min(4, "Minimum 4 characters"),
      email: Yup.string()
        .email("Please use email format")
        .required("This field is required"),
      phoneNumber: Yup.string()
        .required("This field is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Minimum 10 characters")
        .max(12, "Maximum 12 characters"),
      storeName: Yup.string()
        .required("This field is required")
        .min(6, "Minimum 6 characters"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password Minimum 8 characters")
        .minLowercase(1, "Minimum lowercase 1 character")
        .minNumbers(1, "Minimum number is 1 character")
        .minUppercase(1, "Minimum Uppercase character is 1 character"),
      confirmPassword: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      setErrorMessage("");
      handleOnRegister(values);
    },
  });

  const handleOnRegister = (values) => {
    const {
      email,
      username,
      phoneNumber,
      storeName,
      password,
      confirmPassword,
    } = values;
    console.log("register", values);
    axios
      .post("http://localhost:8000/api/auth/register", {
        email,
        username,
        phoneNumber,
        storeName,
        password,
        confirmPassword,
      })
      .then(({ data }) => {
        console.log(data);
        alert("Register success, " + data.message);
        navigate("/login");
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      });
  };

  return (
    <div className="mt-40 flex h-screen w-screen justify-center lg:mt-0 lg:items-center">
      <div>
        <h1 className="text-center text-[80px]">Logo</h1>
        <h1>Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="flex flex-col rounded-md border border-red-400 p-10"
        >
          <InputWithValidation
            formikConfig={formik.getFieldProps("username")}
            name="username"
            placeholder="Username"
            touched={formik.touched.username}
            error={formik.errors.username}
          />
          <InputWithValidation
            formikConfig={formik.getFieldProps("email")}
            name="email"
            placeholder="Email"
            touched={formik.touched.email}
            error={formik.errors.email}
          />

          <InputWithValidation
            name="phoneNumber"
            placeholder="Phone"
            type="tel"
            formikConfig={formik.getFieldProps("phoneNumber")}
            touched={formik.touched.phoneNumber}
            error={formik.errors.phoneNumber}
          />

          <InputWithValidation
            name="storeName"
            placeholder="Store Name"
            formikConfig={formik.getFieldProps("storeName")}
            touched={formik.touched.storeName}
            error={formik.errors.storeName}
          />

          <InputWithValidation
            name="password"
            placeholder="Password"
            type="password"
            formikConfig={formik.getFieldProps("password")}
            touched={formik.touched.password}
            error={formik.errors.password}
          />

          <InputWithValidation
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            formikConfig={formik.getFieldProps("confirmPassword")}
            touched={formik.touched.confirmPassword}
            error={formik.errors.confirmPassword}
          />

          <button
            className="h-10 rounded-md border bg-red-400/80 text-white"
            type="submit"
          >
            Register
          </button>
          <p className="text-red-500">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default Register;
