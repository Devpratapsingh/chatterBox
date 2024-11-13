"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Get access token from session storage
  let accessToken;
  if (typeof window !== 'undefined') {
  // Use sessionStorage here
  const accessToken = sessionStorage.getItem("token");
  // Do something with value
  }

  
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if access token is not available
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (accessToken) {
      const socketInstance = io(`https://chatterbox-iztf.onrender.com/`);
      setSocket(socketInstance);

      // Listen for chat messages
      socketInstance.on("chat message", (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "chat", ...msg },
        ]);
      });

      // Listen for user joined notifications
      socketInstance.on("user joined", (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "notification", ...msg },
        ]);
      });

      // Listen for user left notifications
      socketInstance.on("user left", (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "notification", ...msg },
        ]);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [accessToken]); // Only establish socket connection if access token exists

  const handleUsernameSubmit = () => {
    if (username && socket) {
      socket.emit("join", username); // Send username to the server
      setIsConnected(true); // Mark the user as connected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input && socket) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
  // Use sessionStorage here
  sessionStorage.setItem("token", "");
  // Do something with value
}

   
    router.push("/login"); // Redirect to the login page
  };

  // Check if access token is not defined yet (loading state)
  if (!accessToken) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center p-8 space-y-4 bg-white rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800">Welcome!</h2>
          <p class="text-gray-600">
            Please Login to get started with our platform.
          </p>
          <button class="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700 transition duration-200">
            Login
          </button>
        </div>
      </div>
    );
    // You can replace this with a spinner or loading animation
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa]">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-[#128C7E] mb-6">
          Chat Room
        </h2>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-lg"
        >
          Logout
        </button>

        {!isConnected ? (
          // Username input form
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="px-4 py-3 mb-4 border border-[#25D366] rounded-full focus:outline-none focus:ring-2 focus:ring-[#128C7E] w-full max-w-xs"
            />
            <button
              onClick={handleUsernameSubmit}
              className="px-6 py-3 text-white bg-[#25D366] rounded-full hover:bg-[#128C7E] transition-colors w-full max-w-xs"
            >
              Join Chat
            </button>
          </div>
        ) : (
          <>
            {/* Chat messages list with animation */}
            <div className="h-80 overflow-y-auto border border-[#128C7E] rounded-lg p-4 mb-4 bg-[#f0f0f0] shadow-md">
              {messages.map((msg, index) => (
                <div key={index} className="animate__animated animate__fadeIn">
                  {msg.type === "chat" ? (
                    <div
                      className={`flex ${
                        msg.user === username ? "justify-end" : "justify-start"
                      } mb-4`}
                    >
                      <p
                        className={`text-sm px-4 py-2 rounded-lg ${
                          msg.user === username
                            ? "bg-[#25D366] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <span className="font-semibold">{msg.user}: </span>
                        {msg.text}
                      </p>
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 italic mb-4">
                      {msg.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Message input form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-4 py-3 border border-[#128C7E] rounded-full focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition w-full"
              />
              <button
                type="submit"
                className="px-6 py-3 text-white bg-[#25D366] rounded-full hover:bg-[#128C7E] transition-colors"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
