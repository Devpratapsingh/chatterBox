"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Chatterbox</div>
          <div className="space-x-6">
            <button
              onClick={() => router.push("/login")}
              className="text-white font-medium hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="text-white font-medium hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-20">
        <div className="text-center px-8">
          <h1 className="text-5xl font-bold mb-4">
            Connect with People. Chat Anytime, Anywhere.
          </h1>
          <p className="text-lg mb-6">
            Chatterbox is more than just messaging – it's a way to stay
            connected, share moments, and find support through real-time
            conversations.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100 focus:outline-none"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-indigo-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </div>
      </main>

      {/* How Chatting Helps Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            How Chatting Helps You
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Whether you're catching up with old friends, meeting new ones, or
            just looking for some support, chatting brings people together.
            Here's how it can help:
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-600">
                Chatting allows you to stay connected with loved ones, no matter
                the distance. Share updates, exchange ideas, and create memories
                in real time.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Find Support
              </h3>
              <p className="text-gray-600">
                Whether you're looking for advice or just someone to talk to,
                chatting can provide emotional support and help you through
                tough times.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Share Experiences
              </h3>
              <p className="text-gray-600">
                Chatting makes it easy to share life experiences, ideas, and
                moments. Whether it’s a quick message or a lengthy conversation,
                your voice matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Features You'll Love
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Chatterbox isn't just about messaging – it’s about enhancing your
            communication. Here’s a look at some of the features that make
            chatting more fun and meaningful.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Group Chats
              </h3>
              <p className="text-gray-600">
                Start group chats with your friends and family to share updates,
                organize events, and keep everyone in the loop.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                File Sharing
              </h3>
              <p className="text-gray-600">
                Easily share images, documents, and videos with your contacts,
                making it easier to collaborate and share important content.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Instant Notifications
              </h3>
              <p className="text-gray-600">
                Never miss a message again with instant push notifications that
                keep you updated in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-white py-4">
        <p>&copy; 2024 Chatterbox. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
