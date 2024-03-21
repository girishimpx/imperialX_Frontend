import React, { useEffect, useState } from "react";
import Axios from "axios";
import Constant from "../../Constansts";
import { useLocation, useNavigate } from "react-router-dom";

export default function TOkenverify() {
  const path = useLocation();
  const navigate = useNavigate();
  const [errs, setErrs] = useState()
  const [done, setdones] = useState()
  useEffect(() => {
    // console.log(path.pathname.split('/'),"open")

    Axios.get(`${Constant.BackendUrl}/users/tokenVerify`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: path.pathname.split("/")[2],
      },
    })
      .then((res) => {
        // console.log(res.data)
        Axios.post(`${Constant.BackendUrl}/wallet/createwallet`, { user_id: res.data.result }, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: path.pathname.split("/")[2],
          },
        }).then(success => setdones(success)).catch(failed => { setErrs(failed) })
        navigate(`${Constant.route}/login`, { state: { emailVerify: 0 } })
        window.localStorage.removeItem('email')
      }
      )
      .catch((err) => {
        navigate(`${Constant.route}/login`, { state: { emailVerify: 1 } })
        window.localStorage.removeItem('email')

      }


      );
  });

  return <></>;
}
