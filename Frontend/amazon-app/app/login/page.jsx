"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      console.log("Updated Access Token:", accessToken);
    }
  }, [accessToken]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      sessionStorage.setItem("token", response.data.token);
      router.push("/chatBox");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#d1e7dd]">
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#075e54] mb-8">
          Chatterbox
        </h2>
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h3>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#128c7e] focus:outline-none focus:ring-2 focus:ring-[#25d366]"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <button
            onClick={() => router.push("/signup")}
            className="text-[#25d366] font-semibold ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
