"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";

function RemoveDirectory() {
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
            const response = await axios.delete(`http://localhost:3000/admin/removeDirectory/${name}`);
            if (response.data.success) {
                console.log(response.data.message);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Directory removed successfully.'
                });
                setName('');
            } else {
                console.log(response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to remove Directory.'
                });
            }
        } catch (error) {
            console.log('Failed to remove directory.', error);
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
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img13.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Remove Directory
                        </h2>
                    </div>
                    <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Directory Name
                            </label>
                            <input
                                id="text"
                                name="text"
                                type="text"
                                placeholder="Enter Directory Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isLoading}
                            >
                                {isLoading ? "Removing Directory..." : "Remove Directory"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default RemoveDirectory;

