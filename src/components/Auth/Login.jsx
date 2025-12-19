"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://e-backend-1xjt.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.message === "Login successful") {
      if (data?.user?.role === "admin") {
        setTimeout(() => router.push("/admin"), 2000);
      } else {
        setTimeout(() => router.push("/"), 2000);
      }
      toast.success(data.message)
      localStorage.setItem("token", data?.token)
      localStorage.setItem("user", data?.user)
    }



    console.log(data);
  };

  return (
    <div className="flex w-full h-screen">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 h-full relative">
        <Image
          src="/side.svg"
          alt="side"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-4xl font-semibold mb-2">Log in to your account</h1>
        <p className="text-gray-600 mb-8">Enter your details below</p>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="border-b p-2 outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-b p-2 outline-none"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-500 text-white cursor-pointer py-3 rounded-lg"
          >
            Log In
          </button>

          {/* Google Login */}
          <button
            type="button"
            className="border py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Image src="/google.svg" alt="google" width={20} height={20} />
            Log in with Google
          </button>
        </form>

        {/* Create account */}
        <p className="text-center mt-6 text-gray-700">
          Don't have an account?{" "}
          <Link href={"/auth"} className="font-medium underline cursor-pointer">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
