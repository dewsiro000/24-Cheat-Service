import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ToastNotification: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"  
      autoClose={2000}  
      hideProgressBar={true}  
      newestOnTop={true}  
      closeOnClick
      rtl={false}
    />
  );
};

export default ToastNotification;
