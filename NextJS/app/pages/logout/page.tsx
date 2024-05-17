"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
  // Placeholder function since the logout functionality is handled in the header component
  const handleLogout = () => { };
  const [isLoading, setIsLoading] = useState(false);
  // const LogoutPage: React.FC = () => {
  //   const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     const jwtToken = localStorage.getItem("jwtToken");
  //     if (!jwtToken) {
  //       router.push("/pages/login");
  //     }
  //   }, []);

  //   const handleLogout = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.post("http://localhost:3000/admin/logout");

  //       if (response.status === 200) {
  //         localStorage.removeItem("jwtToken");
  //         sessionStorage.removeItem("jwtToken");
  //         document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //         Swal.fire({
  //           title: "Success",
  //           text: "Logout successful! JWT token cleared.",
  //           icon: "success"
  //         });
  //         // Redirect to login page after successful logout
  //         router.push("/pages/login");
  //       }
  //     } catch (error: any) {
  //       console.log("Error logging out:", error);
  //       Swal.fire({
  //         title: "Error",
  //         text: "An error occurred while logging out. Please try again.",
  //         icon: "error"
  //       });
  //     } finally {
  //       setIsLoading(false); // Set loading state to false regardless of success or failure
  //     }
  //   };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img11.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
        <div className="text-center ">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Log Out
          </h2>
        </div>

        <div className="mt-6">
          <button
            type="button" // Ensure the button type is set to "button" to prevent form submission
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            disabled={isLoading}
            onClick={handleLogout} // Call the handleLogout function when the button is clicked
          >
            {isLoading ? "Logging Out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
