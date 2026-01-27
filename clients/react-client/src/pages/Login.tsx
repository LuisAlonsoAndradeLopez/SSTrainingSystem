import { Link } from "react-router-dom";
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center m-5 p-8 bg-neutral-900">
      <h1>Log In</h1>
      <input
        type="text"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <Link to="/book_management">Add Book</Link>
    </div>
  );
}