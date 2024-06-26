import React, { useEffect, useState } from "react";
import Axios from "axios";
import Constant from "../../Constansts";
import { useLocation, useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

export default function TOkenverify() {
  const path = useLocation();
  const navigate = useNavigate();
  const [errs, setErrs] = useState()
  const [done, setdones] = useState()
  const [load, setLoad] = useState(false)
  const [occurance, setOccurance] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      if (occurance) {
        setLoad(true);
        try {
          const tokenRes = await Axios.get(`${Constant.BackendUrl}/users/tokenVerify`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              Authorization: path.pathname.split("/")[2],
            },
          });


          // console.log(tokenRes, 'tokenRes');

          const userId = tokenRes.data.result;
          // console.log(tokenRes?.data?.user?.email_verify, "emailVerify");
          if (tokenRes?.data?.user?.email_verify == 'false') {
            setLoad(true)
            const generateWalletRes = await Axios.post(
              `${Constant.BackendUrl}/bybit/generatewallet`,
              { user_id: userId },
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                  "Access-Control-Allow-Credentials": "true",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  Authorization: path.pathname.split("/")[2],
                },
                timeout: 300000, // Wait For 5 Minutes Before The Request Time Out
              }
            );
            // console.log('generateWalletRes?.data?.success', generateWalletRes?.data?.success);
            if (generateWalletRes?.data?.success == true) {
              setdones(generateWalletRes);
              navigate(`${Constant.route}/login`, { state: { emailVerify: tokenRes.data.message } });
              window.localStorage.removeItem("email");
              setLoad(false)
            }

          }
          else {
            navigate(`${Constant.route}/login`, { state: { emailVerify: tokenRes.data.message } });
          }
        } catch (error) {
          console.log(error, 'ERRORVERIFy');
          // console.log(error?.response?.data?.message, 'eroor message');
          // setErrs(error);
          // if (error?.response?.data?.message == "Email Already verifyed") {
          //   // console.log(error?.response?.data?.message, 'if');
          //   navigate(`${Constant.route}/login`, { state: { emailVerify: 2 } });
          // }
          // else {
          //   navigate(`${Constant.route}/login`, { state: { emailVerify: 1 } });
          //   window.localStorage.removeItem("email");
          // }

        } finally {
          setLoad(true);
          setOccurance(true);
        }
      }
    };

    fetchData();
  }, [occurance, path, navigate]);

  return (<>
    {load ? (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ marginBottom: "20px" }}>
          <RingLoader size={150} loading={load} color="#1d8974" />
        </div>
        <p style={{ margin: '20px 0px' }}>Please do not close or refresh the browser...</p>
      </div>
    ) : null}
  </>);
}
