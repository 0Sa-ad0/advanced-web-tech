"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";
import { useRouter } from 'next/navigation';


function DirectoryList() {
    const [directories, setDirectories] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


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

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/pages/login");
        }
    }, []);

    useEffect(() => {
        const fetchDirectories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/getDirectory');
                setDirectories(response.data);
            } catch (error) {
                setError('Failed to fetch directories.');
            }
        };

        fetchDirectories();
    }, []);

    return (
        <>
            <div>
                <Header_name_fetch />
            </div>
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Directory List
                        </h2>
                    </div>
                    {error && <p className="text-red-600">{error}</p>}

                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-black">Name</th>
                                <th className="px-4 py-2 text-black">Email</th>
                                <th className="px-4 py-2 text-black">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directories.map((directory: any) => (
                                <tr key={directory.id} className="mb-2">
                                    <td className="border px-4 py-2 text-black">{directory.name}</td>
                                    <td className="border px-4 py-2 text-black">{directory.email}</td>
                                    <td className="border px-4 py-2 text-black">{directory.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default DirectoryList;
