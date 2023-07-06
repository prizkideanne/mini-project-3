import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userReducer/userSlice";

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    console.log(username.value, password.value);

    axios
      .post("http://localhost:8000/api/auth/login", {
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
    <div className="mt-40 flex h-screen w-screen justify-center lg:mt-0 lg:items-center">
      <div>
        <h1 className="text-center text-[80px]">Logo</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col rounded-md border border-red-400 p-10"
        >
          <input
            name="username"
            className="mb-3 rounded-md border border-black px-3 py-1"
            placeholder="Username"
          />
          <input
            name="password"
            className="mb-3 rounded-md border border-black px-3 py-1"
            placeholder="Password"
            type="password"
          />
          <button
            className="h-10 rounded-md border bg-red-400/80 text-white"
            type="submit"
          >
            Login
          </button>
          <p className="text-red-500">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
