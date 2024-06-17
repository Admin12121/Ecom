import React from "react";

export const AccountsIcon = (isActive:any) => {
  return (
    <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Iconly/Light/3-User" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <g id="3-User" transform="translate(1.000000, 3.500000)"  className={`${isActive.isActive ? "stroke-white" : "stroke-default-900"}`} strokeWidth="1.5">
                <path d="M16.8877,7.3967 C18.2827,7.2007 19.3567,6.0047 19.3597,4.5557 C19.3597,3.1277 18.3187,1.9437 16.9537,1.7197" id="Stroke-1"></path>
                <path d="M18.7285,10.7503 C20.0795,10.9523 21.0225,11.4253 21.0225,12.4003 C21.0225,13.0713 20.5785,13.5073 19.8605,13.7813" id="Stroke-3"></path>
                <path d="M10.8867,11.1638 C7.6727,11.1638 4.9277,11.6508 4.9277,13.5958 C4.9277,15.5398 7.6557,16.0408 10.8867,16.0408 C14.1007,16.0408 16.8447,15.5588 16.8447,13.6128 C16.8447,11.6668 14.1177,11.1638 10.8867,11.1638 Z" id="Stroke-5"></path>
                <path d="M10.8867,8.3879 C12.9957,8.3879 14.7057,6.6789 14.7057,4.5689 C14.7057,2.4599 12.9957,0.7499 10.8867,0.7499 C8.7777,0.7499 7.06767183,2.4599 7.06767183,4.5689 C7.0597,6.6709 8.7567,8.3809 10.8587,8.3879 L10.8867,8.3879 Z" id="Stroke-7"></path>
                <path d="M4.8848,7.3967 C3.4888,7.2007 2.4158,6.0047 2.4128,4.5557 C2.4128,3.1277 3.4538,1.9437 4.8188,1.7197" id="Stroke-9"></path>
                <path d="M3.0439,10.7503 C1.6929,10.9523 0.7499,11.4253 0.7499,12.4003 C0.7499,13.0713 1.1939,13.5073 1.9119,13.7813" id="Stroke-11"></path>
            </g>
        </g>
    </svg>
  );
};
