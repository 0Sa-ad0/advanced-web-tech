"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";

const AddTrusteePage = () => {
    const [trusteeName, setTrusteeName] = useState('');
    const [trusteeEmail, setTrusteeEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/pages/login");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if the fields are empty
        if (!trusteeName || !trusteeEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill all fields.'
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/admin/addTrustee', {
                trusteeName,
                trusteeEmail,
            });
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Trustee added successfully.'
                });
                console.log(response);
                router.push("/pages/one-to-one-get");
            } else {
                console.log(response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add trustee.'
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing your request.'
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

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

    return (
        <>
            <div>
                <Header_name_fetch />
            </div>
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img7.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            One to One - Add Trustee
                        </h2>
                    </div>
                    <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Trustee Name
                            </label>
                            <input
                                id="text"
                                name="text"
                                type="text"
                                onChange={(e) => setTrusteeName(e.target.value)}
                                value={trusteeName}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Trustee Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="trusteeEmail" className="sr-only">Trustee Email</label>
                            <input
                                type="email"
                                name="email"
                                id="trusteeEmail"
                                value={trusteeEmail}
                                onChange={(e) => setTrusteeEmail(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="text-red-500">{error}</div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding Trustee..." : "Add Trustee"}
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

export default AddTrusteePage;
