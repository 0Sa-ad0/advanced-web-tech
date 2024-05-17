"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface UserInfo {
  name: string;
}

const useUserInfo = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("jwtToken");
        if (authToken) {
          const response = await axios.get("http://localhost:3000/admin/index", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const userData: UserInfo = {
            name: response.data.name,
          };
          setUserInfo(userData);
          console.log("Response Data:", response.data);
          setUserInfo(response.data);
        } else {
          router.push("/pages/login");
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
        Swal.fire({
          title: "Error",
          text: "Error fetching user information. Please try again.",
          icon: "error",
        });
      }
    };

    fetchUserInfo();
  }, [router]);

  return userInfo;
};

export default useUserInfo;
