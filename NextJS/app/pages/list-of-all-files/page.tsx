"use client"

// ListFiles.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination/page";
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";



const ListFiles = () => {
    const [sortByNewest, setSortByNewest] = useState(true); // State to track sorting order
    const [files, setFiles] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const limitPerPage = 5;


    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/pages/login");
        }
    }, []);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admin/listfiles");
                let sortedFiles = response.data.files;
                if (!sortByNewest) {
                    sortedFiles = sortedFiles.reverse(); // Reverse the array to sort from oldest to newest
                }
                setFiles(sortedFiles);
                // setFiles(response.data.files);
                setIsLoading(false);
            } catch (error) {
                setError("Error fetching files");
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [sortByNewest]);

    const totalPages = Math.ceil(files.length / limitPerPage);

    const indexOfFirstFile = (currentPage - 1) * limitPerPage;

    const currentFiles = files.slice(
        indexOfFirstFile,
        indexOfFirstFile + limitPerPage
    );

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleSortOrder = () => {
        setSortByNewest((prevState) => !prevState); // Toggle sorting order
    };

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

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

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div>
                <Header_name_fetch />
            </div>
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img5.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            List of All Files
                        </h2>
                    </div>
                    <div className="flex justify-end mb-4">
                        <button onClick={toggleSortOrder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {sortByNewest ? "Sort Oldest First" : "Sort Newest First"}
                        </button>
                    </div>
                    <form className="mt-8 border border-gray-300 p-6 rounded-md text-black flex flex-col items-center mx-auto">
                        <ul className="list-disc pl-6">
                            {currentFiles.map((file, index) => (
                                <li key={index}>{file}</li>
                            ))}
                        </ul>
                    </form>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default ListFiles;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const ListFiles = () => {
//     const [files, setFiles] = useState<string[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();

//     useEffect(() => {
//         const jwtToken = localStorage.getItem("jwtToken");
//         if (!jwtToken) {
//             router.push("/pages/login");
//         }
//     }, []);

//     useEffect(() => {
//         const fetchFiles = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/admin/listfiles');
//                 setFiles(response.data.files);
//                 setIsLoading(false);
//             } catch (error) {
//                 setError('Error fetching files');
//                 setIsLoading(false);
//             }
//         };

//         fetchFiles();
//     }, []);

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img5.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
//                 <div className="text-center ">
//                     <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
//                         List of All Files
//                     </h2></div>
//                 <form className="mt-8 border border-gray-300 p-6 rounded-md text-black">
//                     <ul className="list-disc pl-6">
//                         {files.map((file, index) => (
//                             <li key={index}>{file}</li>
//                         ))}
//                     </ul>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ListFiles;