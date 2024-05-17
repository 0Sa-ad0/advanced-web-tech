
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";


const UploadExcelPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus] = useState<string>('');
    const router = useRouter();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [fileName, setFileName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/pages/login");
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select an Excel file to upload.'
            });
            return;
        }

        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'xlsx') {
            Swal.fire({
                icon: 'error',
                title: 'Invalid file',
                text: 'Please upload a .xlsx file.'
            });
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', selectedFile);

        try {
            const response = await axios.post('http://localhost:3000/admin/upload-excel', formData, {
                onUploadProgress: progressEvent => {
                    if (progressEvent.total !== undefined) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Excel file parsed into CSV successfully.',
                confirmButtonText: 'OK',
            }).then(() => {
                setUploadProgress(0);
                setSelectedFile(null);
                setFileName('');
            });
            router.push("/pages/list-of-all-files");

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error uploading Excel file. Please try again.'
            });
            console.log('Error uploading Excel file:', error);
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
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img4.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Excel to CSV
                        </h2>
                    </div>
                    <div className="border p-2 rounded-md mb-4 w-full h-40 flex flex-col items-center justify-center border-dashed border-gray-300 cursor-pointer text-black">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-2 fill-blue inline-block" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            <h4 className="text-base font-semibold text-blue">{fileName ? fileName : 'Drag & Drop or Choose file'}</h4>
                        </label>
                    </div>

                    <button
                        onClick={handleUpload}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // disabled={isLoading}
                    >
                        {/* {isLoading ? "Uploading..." : "Upload"} */}upload
                    </button>
                    {uploadStatus && <p className="text-green-500 mt-2">{uploadStatus}</p>}
                    {uploadProgress > 0 && (
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                        In Progress
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-green-600">
                                        {uploadProgress}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                <div
                                    style={{ width: `${uploadProgress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default UploadExcelPage;


// headers: {
//     'Content-Type': 'multipart/form-data'
// }