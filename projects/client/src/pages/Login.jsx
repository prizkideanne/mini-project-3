import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userReducer/userSlice";
import LoginBG from "../assets/login-bg.jpg";
import FormInput from "../components/FormInput";
import Logo from "../components/Logo";

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    console.log(username.value, password.value);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        username: username.value,
        password: password.value,
      })
      .then(({ data }) => {
        console.log("success", data);
        localStorage.setItem("token", data.accessToken);
        dispatch(addUser(data.data));
        navigate("/", { replace: true });
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      });
  };

  return (
    <div className="flex h-screen w-screen justify-center bg-white">
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{" "}
                <Link
                  to={"/register"}
                  className="font-semibold text-science-blue-600 hover:text-science-blue-500"
                >
                  Register
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={onSubmit} method="POST" className="space-y-6">
                  <FormInput
                    label={"Username"}
                    name={"username"}
                    type="text"
                    required
                  />

                  <FormInput
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    required
                  />

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-gradient-to-r from-science-blue-500 to-science-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-science-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-science-blue-600"
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

export default Login;
