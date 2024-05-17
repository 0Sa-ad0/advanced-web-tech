"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Footer from "@/app/components/footer/page";
import Header_for_login from "@/app/components/header-for-login/page";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("jwtToken", response.data.token);
        sessionStorage.setItem("isLoggedIn", "true");
        Swal.fire({
          title: "Success",
          text: "Login successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          router.push("/pages/index");
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Error",
        text: "PLEASE FILL ALL",
        icon: "error"
      });
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
        <Header_for_login />
      </div>
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img12.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
          <div className="text-center ">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Log in to your account
            </h2>
          </div>
          <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Not Registered?{" "}
            <a href="/pages/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up now
            </a>
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;