import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CornerDownRight } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold m-6">Transiction completed</h1>
        <div className="flex flex-col text-center border w-2/5 p-4">
          <p>Thank you for your order</p>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil,
            assumenda tenetur dolore officiis dolorum dolores non! Officiis
            aspernatur nisi tempora voluptas animi, incidunt iste quisquam harum
            laborum! Cupiditate, similique illum!
          </p>
          <button
            className="p-4 border m-4 flex flex-row gap-2 rounded-md items-center justify-start hover:justify-center transition-all duration-300 ease-in-out"
            onClick={handleBackToHome}
          >
            <span className="flex items-center transition-all duration-300 ease-in-out">
              <CornerDownRight />
              Returning to home
            </span>
          </button>

          <NavLink to="/store">Continues to shopping</NavLink>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
