import Axios from "../Axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Constant from "../Constansts";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function WalletValidation({ children }) {
  const [allow, setAllow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Mellifluous")) {
      setAllow(false);
      Axios.get(`/users/kycVerify`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => setAllow(true))
        .catch((err) => {
          if (!err.response?.data?.result) {
            Axios.get(`/users/mykycdetail`, {
              headers: {
                Authorization: localStorage.getItem("Mellifluous"),
              },
            }).then((res1) => {
              const status = res1.data?.return?.status;
              if (status == "0") {
                toast.error(`${"your kyc verification is in pending"}`, {
                  
                    duration: 1000,
                    position: "top-center",
          
                    // Styling
                    style: {
                      padding: "1rem",
                      fontSize: "15px",
                      color: "red",
                      fontWeight: "bold",
                    },
                    className: "",
          
                    // Custom Icon
                    icon: "",
          
                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
          
                    // Aria
                    ariaProps: {
                      role: "status",
                      "aria-live": "polite",
                    },
                  });

                setTimeout(() => {
                  navigate(`${Constant.route}/`, {
                    state: {
                      kyc: true,
                    },
                  });
                }, 1200);
              } else if (status == "2") {
                toast.error(`${"your kyc verification is Denied by Admin"}`, {
                  
                    duration: 1000,
                    position: "top-center",
          
                    // Styling
                    style: {
                      padding: "1rem",
                      fontSize: "15px",
                      color: "red",
                      fontWeight: "bold",
                    },
                    className: "",
          
                    // Custom Icon
                    icon: "",
          
                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
          
                    // Aria
                    ariaProps: {
                      role: "status",
                      "aria-live": "polite",
                    },
                  });
                setTimeout(() => {
                  navigate(`${Constant.route}/`, {
                    state: {
                      kyc: true,
                    },
                  });
                }, 1200);
              }
            });
          } else {
            navigate(`${Constant.route}/`);
          }
        });
    } else {
      navigate(`${Constant.route}/`);
    }
  }, []);
  return (
    <>
      <Toaster />
      {allow && children}
    </>
  );
}

export default WalletValidation;
