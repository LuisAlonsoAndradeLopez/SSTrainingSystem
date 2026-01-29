import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { login } from '../api/authApi';
import { getAxiosErrorMessage } from "../utils/axiosError";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Buttons OnClicks Methods
  const loginButtonOnClick = async () => {
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem('loggedUserToken', res.data.token);
      localStorage.setItem('loggedUserName', res.data.user.name);
      navigate('/book_management');
    } catch (error) {
      alert(getAxiosErrorMessage(error, "Registration failed"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center my-44 p-8 gap-5 w-[50%] h-100 bg-neutral-900">
        <h1 className="text-3xl font-bold text-white mb-5">LogIn</h1>
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

        <div className="flex flex-row justify-center items-center w-full gap-16">
          <button
            type="button"
            onClick={loginButtonOnClick}
            className="w-[25%] text-center text-white bg-blue-600 hover:bg-blue-700
             font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
          <Link to="/register_user" className="w-[25%] text-center !text-white bg-red-600 hover:bg-red-700
              font-semibold py-2 rounded-md transition duration-200">Register User</Link>
        </div>
      </div>
    </div>
  );
}