"use client";

import Footer from "@/app/components/footer/page";
import Header_name_fetch from "@/app/components/header-name-fetch/page";
import { useState } from "react";


const IndexPage: React.FC = () => {
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

  return (
    <>
    <div>
        <Header_name_fetch />
      </div>
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
        <div>
          <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mt-6">
            Welcome to UMS
          </h2>
        </div>
        {/* <div className="mt-8">
          {userInfo && (
            <p className="text-green-500 text-center font-bold text-2xl">
              Hello, {userInfo}
            </p>
          )}
        </div> */}
      </div>
    </div>
      <div>
        <Footer />
      </div>
      </>
  );
};

export default IndexPage;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// interface UserInfo {
//   name: string;
// }

// const IndexPage: React.FC = () => {
//   const router = useRouter();
//   const [userInfo, setUserInfo] = useState<any>(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const authToken = localStorage.getItem("jwtToken");
//         if (authToken) {
//           const response = await axios.get("http://localhost:3000/admin/index", {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           });
//           const userData: UserInfo = {
//             name: response.data.name,
//           };
//           setUserInfo(userData);
//           console.log("Response Data:", response.data);
//           setUserInfo(response.data);
//         } else {
//           router.push("/pages/login");
//         }
//       } catch (error) {
//         console.log("Error fetching user info:", error);
//         Swal.fire({
//           title: "Error",
//           text: "Error fetching user information. Please try again.",
//           icon: "error",
//         });
//       }
//     };

//     fetchUserInfo();
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("/img3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
//         <div>
//           <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mt-6">
//             Welcome to UMS
//           </h2>
//         </div>
//         <div className="mt-8">
//           {userInfo && (
//             <p className="text-green-500 text-center font-bold text-2xl">
//               Hello, {userInfo}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default IndexPage;