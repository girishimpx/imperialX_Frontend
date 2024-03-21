import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Constant from '../Constansts'

function PrivateRoute({ children }) {
  const token = localStorage.getItem("Mellifluous")
  
  return localStorage.getItem("Mellifluous")  ? children : <Navigate to={`${Constant.route}/`} />;
}

export default PrivateRoute;
