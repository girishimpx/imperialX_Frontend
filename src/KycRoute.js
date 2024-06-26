import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from './Axios';
import Constant from './Constansts';

function KycPrivateRoute({ children }) {


  const navigate = useNavigate()
  const [allow, setalloew] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("Mellifluous")) {
      try {
        Axios.get(`${Constant.BackendUrl}/users/kycsybmit`, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        })
          .then((res) => {
            navigate('/')
            //   console.log(res.data,"exzi")
          })
          .catch((err) => {
            setalloew(true)
          });
      } catch (error) {
        console.log("🚀 ~ file: KycRoute.js:27 ~ useEffect ~ error:", error)

      }

    }


  }, []);

  return allow && children;
}

export default KycPrivateRoute;
