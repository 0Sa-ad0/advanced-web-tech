"use client"

import React, { useState, useEffect } from 'react';
import useUserInfo from "@/app/components/name-fetching/page";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Swal from "sweetalert2";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const Header_name_fetch: React.FC = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);

  const handleToggleFeatureDropdown = () => {
    setIsFeatureDropdownOpen(!isFeatureDropdownOpen);
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/logout");

      if (response.status === 200) {
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");
        document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Swal.fire({
          title: "Success",
          text: "Logout successful! JWT token cleared.",
          icon: "success"
        });
        // Redirect to login page after successful logout
        router.push("/pages/login");
      }
    } catch (error: any) {
      console.log("Error logging out:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while logging out. Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
        <a href="/" className="flex items-center">
          <span className="text-lg font-bold text-black">UMS</span>
        </a>
        <div id="collapseMenu"
          className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
          <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li className='mb-6 hidden max-lg:block'>
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
              </a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='http://localhost:3003/'
                className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</a>
            </li>

            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/pages/about'
                className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>About</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/pages/contact'
                className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Contact</a>
            </li>


            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-0.1 text-sm font-semibold text-gray-500 hover:text-[#007bff] shadow-sm hover:bg-gray-50">
                  Features
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/index"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Index
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/excel-csv"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Excel to CSV
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/upload-files"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Upload Files
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/list-of-all-files"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          List of all Uploaded Files
                        </a>
                      )}
                    </Menu.Item>

                    <div className="group inline-block text-gray-900 ">
                      <button className="outline-none focus:outline-none px-4 py-2 bg-white  rounded-sm flex items-center min-w-32">
                        <span className="pr-1  flex-1">One-to-One</span>
                        <span>
                          <svg className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-one-add">Add</a>
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-one-get">Get</a>
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-one-remove">Remove</a>
                        </li>
                      </ul>
                    </div>

                    <div className="group inline-block text-gray-900 ">
                      <button className="outline-none focus:outline-none px-4 py-2 bg-white  rounded-sm flex items-center min-w-32">
                        <span className="pr-1  flex-1">One-to-Many</span>
                        <span>
                          <svg className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-many-add">Add</a>
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-many-get">Get</a>
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                          <a href="/pages/one-to-many-remove">Remove</a>
                        </li>
                      </ul>
                    </div>

                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/sendmail"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Send Mail
                        </a>
                      )}
                    </Menu.Item>

                  </div>
                </Menu.Items>
              </Transition>
            </Menu>




          </ul>
        </div>

        <div className='flex max-lg:ml-auto space-x-3'>
          <div className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
            {userInfo && (
              <div className="relative">
                <button className="text-green-500 font-bold border border-red-500 px-4 py-2 rounded-lg" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {userInfo}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    <ul>

                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={handleLogout}>Logout</a>

                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <button id="toggleOpen" className='lg:hidden'>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>


      </div>
    </header>
  );
}

export default Header_name_fetch;

{/* <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form> */}

{/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/one-to-one-add"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          One to One - Add
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/one-to-one-get"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          One to One - Get
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/pages/one-to-one-remove"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          One to One - Remove
                        </a>
                      )}
                    </Menu.Item> */}

{/* <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3 relative'>
              <a className='hover:text-[#007bff] text-gray-500 block border-blue max-lg:border-b font-semibold text-[15px] relative' onClick={handleToggleFeatureDropdown}>
                FEATURE
                {isFeatureDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                    <ul>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Feature 1</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Feature 2</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Feature 3</a>
                      </li>
                    </ul>
                  </div>
                )}
              </a>
            </li> */}


{/* <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'><a href='javascript:void(0)'
                className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Team</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'><a href='javascript:void(0)'
                className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Feature</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'><a href='javascript:void(0)'
                className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Blog</a>
            </li> */}

{/* <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Earnings</a>
                      </li> */}


{/* <div className='flex max-lg:ml-auto space-x-3'>

          <div className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
            {userInfo && (
              <p className="text-green-500 text-center font-bold text-1xl">
                Hello, {userInfo}
              </p>
            )}
          </div>

          <button className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]" onClick={handleLogout}>
            Logout
          </button>

          <button id="toggleOpen" className='lg:hidden'>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div> */}