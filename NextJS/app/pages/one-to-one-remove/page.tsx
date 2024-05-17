"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";

function RemoveTrustee() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      router.push("/pages/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill the field.'
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/admin/removeTrustee/${name}`);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Trustee removed successfully.'
        });
        setName('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove trustee.'
        });
      }
    } catch (error) {
      console.error('Error removing trustee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing your request.'
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
        <Header_name_fetch />
      </div>
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img9.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
          <div className="text-center ">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Remove Trustee
            </h2>
          </div>

          <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Trustee Name
              </label>

              <input
                id="text"
                name="text"
                type="text"
                placeholder="Enter Trustee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Removing Trustee..." : "Remove Trustee"}
            </button>

          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default RemoveTrustee;


// import { useState } from 'react';
// import axios from 'axios';

// function RemoveTrustee() {
//   const [name, setName] = useState('');
//   const [trusteeId, setTrusteeId] = useState(null);

//   // const searchTrustee = async () => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:3000/admin/searchTrusteeByName/${name}`);
//   //     if (response.data.id) {
//   //       setTrusteeId(response.data.id);
//   //     } else {
//   //       alert('Trustee not found.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error searching trustee:', error);
//   //     alert('An error occurred while searching for the trustee.');
//   //   }
//   // };

//   const removeTrustee = async () => {
//     if (!name) {
//       alert('Please search for a trustee first.');
//       return;
//     }

//     try {
//       const response = await axios.delete(`http://localhost:3000/admin/removeTrustee/${name}`);
//       if (response.data.success) {
//         alert(response.data.message);
//         setTrusteeId(null); // Clear trustee ID after removal
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto flex flex-col items-center justify-center h-screen text-white">
//       <h1 className="text-4xl font-bold mb-4">Remove Trustee</h1>
//       <input
//         type="text"
//         placeholder="Enter Trustee Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-400 text-black"
//       />
//       {/* <button
//         onClick={searchTrustee}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//       >
//         Search Trustee
//       </button> */}
//       <button
//         onClick={removeTrustee}
//         className="w-full bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600 transition duration-200"
//         disabled={!trusteeId}
//       >
//         Remove Trustee
//       </button>
//     </div>
//   );
// }

// export default RemoveTrustee;

