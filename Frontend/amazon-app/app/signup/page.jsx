"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function signup() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emessage, setEmessage] = useState("");
  const [name, setName] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const router = useRouter();

  function handleEmail(e) {
    let x = e.target.value;
    setEmail(x);

    if (x.includes("@") == false && x.includes(".") == false) {
      setEmessage("Not a valid email");
    } else {
      setEmessage("");
    }
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password != confirm_password) {
      setMessage("password and cofirm password doesn't match");
    } else if (email == "") {
      setMessage("Set a valid Email");
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`,
          {
            email,
            name,
            password,
          }
        );

        setMessage(response.data.message);
        setEmail("");

        router.push("/login");
      } catch (error) {
        setMessage(error.response?.data?.message || "Error signing up");
        console.log(error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-[#25D366] mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 bg-[#e8f5e9] border border-[#25D366] rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              required
              className="mt-2 block w-full px-4 py-3 bg-[#e8f5e9] border border-[#25D366] rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] transition"
              placeholder="Enter your email"
            />
          </div>

          {emessage && (
            <p className="text-center text-sm text-green-600">{emessage}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-[#e8f5e9] border border-[#25D366] rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] transition"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm_password}
              required
              onChange={(e) => setConfirm_password(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-[#e8f5e9] border border-[#25D366] rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] transition"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#128C7E] hover:text-[#075E54] font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
