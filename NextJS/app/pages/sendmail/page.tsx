"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";


const SendMail = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/pages/login");
        }
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = { ...errors };

        if (!formData.email.trim()) {
            newErrors.email = 'Email field is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message field is required';
        }

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => error === '');

        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill all required fields.'
            });
        }

        return isValid;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateForm()) {
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('email', formData.email);
        formDataToSend.append('message', formData.message);

        try {
            const response = await axios.post("http://localhost:3000/admin/sendmail", {
                email: formData.email,
                message: formData.message
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Email Sent',
                text: 'Email sent successfully!'
            });
            setFormData({
                email: '',
                message: ''
            });
        }
        catch (error) {
            console.log('Error sending mail:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error sending email. Please try again.'
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
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img10.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
                    <div className="text-center ">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Send Mail
                        </h2>
                    </div>
                    <form className="mt-8 border border-gray-300 p-6 rounded-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
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
                            {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="sr-only">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                // type="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Message"
                            />
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending Message..." : "Send Message"}
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

export default SendMail;
