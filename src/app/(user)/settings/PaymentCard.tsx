import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const PaymentCard = () => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="flex flex-col items-start justify-end max-w-[300px] max-h-[200px] h-[160px] rounded-lg p-5 font-sans relative gap-4">
            <div className="w-full flex items-center justify-end absolute top-0 left-0 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 48 48"
                className="h-10 w-auto"
              >
                <path
                  fill="#ff9800"
                  d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                ></path>
                <path
                  fill="#d50000"
                  d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                ></path>
                <path
                  fill="#ff3d00"
                  d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                ></path>
              </svg>
            </div>
            <div className="w-full flex flex-col">
              <label
                className="text-xs tracking-wide text-gray-200"
                htmlFor="cardNumber"
              >
                CARD NUMBER
              </label>
              <input
                className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-[25px] tracking-wider placeholder-white"
                id="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                name="cardNumber"
                type="text"
              />
            </div>
            <div className="w-full flex gap-2 h-[25px]">
              <div className="w-[60%] flex flex-col">
                <label
                  className="text-xs tracking-wide text-gray-200"
                  htmlFor="holderName"
                >
                  CARD HOLDER
                </label>
                <input
                  className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-[25px] tracking-wider placeholder-white"
                  id="holderName"
                  placeholder="NAME"
                  type="text"
                />
              </div>
              <div className="w-[30%] flex flex-col">
                <label
                  className="text-xs tracking-wide text-gray-200"
                  htmlFor="expiry"
                >
                  VALID THRU
                </label>
                <input
                  className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-[25px] tracking-wider placeholder-white"
                  id="expiry"
                  placeholder="MM/YY"
                  type="text"
                />
              </div>
              <div className="w-[10%] flex flex-col">
                <label
                  className="text-xs tracking-wide text-gray-200"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-[25px] tracking-wider placeholder-white"
                  id="cvv"
                  placeholder="***"
                  //   maxLength="3"
                  type="password"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default PaymentCard;
