"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://e-backend-1xjt.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.message === "User registered successfully") {
      toast.success(data.message)
      router.push("/auth/login")
    }
    console.log(data);
  };

  return (
    <div className="flex w-full h-screen">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 h-full relative">
        <Image
          src="/side.svg"
          alt="side"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-4xl font-semibold mb-2">Create an account</h1>
        <p className="text-gray-600 mb-8">Enter your details below</p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-b p-2 outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email or Phone */}
          <input
            type="text"
            name="email"
            placeholder="Email or Phone Number"
            className="border-b p-2 outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border-b p-2 outline-none"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border-b p-2 outline-none"
            value={formData.address}
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

          {/* Create Account */}
          <button
            type="submit"
            className="bg-red-500 cursor-pointer text-white py-3 rounded-lg"
          >
            Create Account
          </button>

          {/* Sign up with Google */}
          <button
            type="button"
            className="border py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Image src="/google.svg" alt="google" width={20} height={20} />
            Sign up with Google
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center mt-6 text-gray-700">
          Already have account?{" "}
          <Link href={"/auth/login"} className="font-medium underline cursor-pointer">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
