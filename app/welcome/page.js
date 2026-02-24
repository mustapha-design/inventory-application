
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // ✅ SIGNUP FLOW
      if (!username || !email || !password || !rePassword) {
        alert("Please fill in all fields");
        return;
      }

      if (password !== rePassword) {
        alert("Passwords do not match");
        return;
      }

      // get all users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // check if email already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        alert("User with this email already exists!");
        return;
      }

      // add new user
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! Please login");
      setIsSignup(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setRePassword('');

    } else {
      // ✅ LOGIN FLOW
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Invalid login details");
        return;
      }

      // save logged-in username
      localStorage.setItem("loggedInUser", user.username);

      // redirect to inventory page
      router.push("/iventory-application"); // make sure your inventory page route is correct
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="relative bg-white p-8 rounded-md shadow-lg w-full max-w-md">

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-center text-xl text-gray-800 mb-6 tracking-wide">
          {isSignup ? "SIGN UP" : "LOGIN"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignup && (
            <input
              type="password"
              placeholder="Re-enter Password"
              className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          )}

          {!isSignup && (
            <p className="text-sm text-cyan-500 hover:underline cursor-pointer">
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-500 cursor-pointer hover:underline"
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
}