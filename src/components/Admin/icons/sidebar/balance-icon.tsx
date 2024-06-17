import React from "react";

export const BalanceIcon = (isActive:any) => {
  return (
<svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="Iconly/Light/Wallet" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Wallet" transform="translate(2.500000, 3.000000)" className={`${isActive.isActive ? "stroke-white" : "stroke-default-900"}`} strokeWidth="1.5">
            <path d="M19.1389383,11.3957621 L15.0906357,11.3957621 C13.6041923,11.3948508 12.399362,10.1909319 12.3984507,8.70448849 C12.3984507,7.21804511 13.6041923,6.01412622 15.0906357,6.01321486 L19.1389383,6.01321486" id="Stroke-1"></path>
            <line x1="15.5485988" y1="8.64287993" x2="15.2369105" y2="8.64287993" id="Stroke-3"></line>
            <path d="M5.24766462,1.52259158e-14 L13.8910914,1.52259158e-14 C16.7892458,1.52259158e-14 19.138756,2.34951014 19.138756,5.24766462 L19.138756,12.4246981 C19.138756,15.3228526 16.7892458,17.6723627 13.8910914,17.6723627 L5.24766462,17.6723627 C2.34951014,17.6723627 1.69176842e-15,15.3228526 1.69176842e-15,12.4246981 L1.69176842e-15,5.24766462 C1.69176842e-15,2.34951014 2.34951014,1.52259158e-14 5.24766462,1.52259158e-14 Z" id="Stroke-5"></path>
            <line x1="4.53561176" y1="4.53816359" x2="9.93456368" y2="4.53816359" id="Stroke-7"></line>
        </g>
    </g>
</svg>
  );
};
