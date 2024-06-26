import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Constant from "../../Constansts";
import Axios from "../../Axios";

function SpotRoute({ children }) {
  const [allow, setAllow] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {

    if (localStorage.getItem("Mellifluous")) {

      Axios.get(`${Constant.BackendUrl}/trade/getMysubscription`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          // console.log("🚀 ~ file: spotprivate.js:23 ~ .then ~ res.data.success:", res.data.success)

          if (res?.data?.success === true) {
            setAllow(true);
          } else {
            navigate(`/Subscription`, {
              state: {
                page: "exchange",
                message: "Please Subscribe to trade"
              }
            });
          }

        })
        .catch((err) => {

        });

    } else {
      navigate(`/login`);
    }
  }, []);

  return allow && children;
}

export default SpotRoute;
