import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from '../api/authApi';
import axios from "axios";

export default function RegisterUser() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Buttons OnClick Functions
  const registerUserButtonOnClick = async () => {
    if (form.password !== form.repeat_password) {
      alert("Passwords aren't equal");
      return;
    }

    try {
      const res = await registerUser({
        name: form.username,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem('token', res.data.token);
      alert("User registered successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Registration failed");
      } else {
        alert("Unexpected error occurred");
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center m-5 p-8 gap-5 w-[180%] bg-neutral-900">
        <h1 className="text-3xl font-bold text-white mb-5">Register User</h1>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-[90%] h-10 px-2 bg-white text-xl text-black rounded-md"
        />
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-[90%] h-10 px-2 bg-white text-xl text-black rounded-md"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-[90%] h-10 px-2 bg-white text-xl text-black rounded-md"
        />
        <input
          type="password"
          name="repeat_password"
          value={form.repeat_password}
          onChange={handleChange}
          placeholder="Repeat Password"
          className="w-[90%] h-10 px-2 bg-white text-xl text-black rounded-md"
        />

        <div className="flex flex-row justify-center items-center w-full gap-16">
          <Link to="/" className="w-[25%] text-center !text-white bg-blue-600 hover:bg-blue-700
              font-semibold py-2 rounded-md transition duration-200">Back</Link>
          <button className="w-[25%] text-center !text-white bg-red-600 hover:bg-blue-700
              font-semibold py-2 rounded-md transition duration-200" onClick={registerUserButtonOnClick}>Register User</button>
        </div>
      </div>
    </div>
  );
}