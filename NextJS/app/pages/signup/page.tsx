"use client";

import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import Header_for_signup from "@/app/components/header-for-signup/page";
import Footer from "@/app/components/footer/page";
import Swal from "sweetalert2";


const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      // setError("Please fill all.");
      Swal.fire({
        title: "Error",
        text: "Please fill all fields.",
        icon: "error"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      // setError("Please enter a valid email address.");
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email address.",
        icon: "error"
      });
      return;
    }




    let incorrectInput = "";
    const badPasswordLength =
      formData.password.length < 1 || formData.password.length > 20;

    if (badPasswordLength) {
      incorrectInput += " The password should be within 1 to 20 characters.\n";
    }

    if (incorrectInput !== "") {
      console.log(incorrectInput);
      Swal.fire({
        title: "Error",
        text: incorrectInput,
        icon: "error"
      });
      return;
    }

    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/admin/signup", formData);
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success",
          text: `Signup successful! Welcome, ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}!`,
          icon: "success",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      } router.push("/pages/login");
    } catch (error: any) {
      if (error.response) {
        console.log(
          `Invalid email or password. Please try again. ${error.response?.data?.message || ""}`
        );
        Swal.fire({
          title: "Error",
          text: `Invalid email or password. Please try again. ${error.response?.data?.message || ""}`,
          icon: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }

    if (isLoading) {
      return (
        <div className="flex animate-pulse">
          <div className="flex-shrink-0">
            <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
          </div>
          <div className="ms-4 mt-2 w-full">
            <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700" style={{ width: '40%' }}></p>
            <ul className="mt-5 space-y-3">
              {[...Array(5)].map((_, index) => (
                <li key={index} className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

  };


  return (
    <>
      <div>
        <Header_for_signup />
      </div>
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mt-6">
              Sign up for an account
            </h2>
            <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"

                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Name"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              </div>

              <div className="mt-4 max-w-sm space-y-3">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="hs-leading-icon"
                      name="hs-leading-icon"
                      className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="you@site.com"
                    />

                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <svg
                        className="flex-shrink-0 size-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>



              <div className="mt-4">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"

                  onChange={handleChange}
                  value={formData.phone}
                  placeholder="Phone"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign up"}
                </button>
              </div>

            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Registered?{" "}
              <a href="/pages/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login now
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
export default SignUpPage;
