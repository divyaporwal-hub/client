import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("userInfo", null);
    navigate("/login");
  }, []);
  return (
    <>
      <h1>logout page</h1>
    </>
  );
};
export default Logout;
