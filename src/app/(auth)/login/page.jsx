"use client";
import { useState } from "react";
import axios from "axios";
import { showSuccessToast, showErrorToast } from '../../../../toastConfig';
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if email or password is empty
    if (!email.trim() || !password.trim()) {
      showErrorToast('Email and password are required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showErrorToast('Invalid email format');
      return;
    }

    // Password validation
    if (password.length < 6) {
      showErrorToast('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      showSuccessToast('Logged in successfully')
      router.push("/movies/list", { scroll: false });
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      showErrorToast('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="authorize">
        <h1 className="text-center m-0">Sign in</h1>
        <br />
        <br className="d-none-sm" />
        <form action="">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="authorize_remember">
            <label htmlFor="rem">
              <input id="rem" type="checkbox" /> Remember me
            </label>
          </div>

          <button
            className="btn btnPrimary w-100"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
