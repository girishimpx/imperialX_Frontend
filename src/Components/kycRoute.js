import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Constant from '../Constansts'

function KycRoute({ children }) {
  return localStorage.getItem("kyc_verify") === true ? children : <Navigate  to={
    (`${Constant.route}/kyc-verification`)
  } />;
}

export default KycRoute;
