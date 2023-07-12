import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputWithValidation from "../components/InputWithValidation";
import { useNavigate, Link } from "react-router-dom";
import LoginBG from "../assets/login-bg.jpg";
import Logo from "../components/Logo";

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
    <div className="flex h-screen w-screen justify-center bg-white">
      <div className="relative flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold text-science-blue-600 hover:text-science-blue-500"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div>
                <form
                  className="flex flex-col gap-3 lg:grid lg:w-[512px] lg:grid-cols-2 lg:gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <InputWithValidation
                    label={"Username"}
                    name={"username"}
                    type="text"
                    formikConfig={formik.getFieldProps("username")}
                    touched={formik.touched.username}
                    error={formik.errors.username}
                  />

                  <InputWithValidation
                    formikConfig={formik.getFieldProps("email")}
                    name="email"
                    label="Email Address"
                    type={"email"}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                  />

                  <InputWithValidation
                    name="phoneNumber"
                    placeholder="Phone"
                    label={"Phone"}
                    type="tel"
                    formikConfig={formik.getFieldProps("phoneNumber")}
                    touched={formik.touched.phoneNumber}
                    error={formik.errors.phoneNumber}
                  />

                  <InputWithValidation
                    name="storeName"
                    label="Store Name"
                    formikConfig={formik.getFieldProps("storeName")}
                    touched={formik.touched.storeName}
                    error={formik.errors.storeName}
                  />

                  <InputWithValidation
                    name="password"
                    label="Password"
                    type="password"
                    formikConfig={formik.getFieldProps("password")}
                    touched={formik.touched.password}
                    error={formik.errors.password}
                  />

                  <InputWithValidation
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    formikConfig={formik.getFieldProps("confirmPassword")}
                    touched={formik.touched.confirmPassword}
                    error={formik.errors.confirmPassword}
                  />

                  <div className="col-start-2">
                    <button
                      type="submit"
                      className=" flex w-full justify-center rounded-md bg-gradient-to-r from-science-blue-500 to-science-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-science-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-science-blue-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="fixed right-0 h-full w-1/2 object-cover"
            src={LoginBG}
            alt="login-bg"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
