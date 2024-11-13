import React from "react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";

  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const sizeMap = {
  sm: "1.5em",

  md: "3.25em",
  lg: "5em",
};

const colorMap = {
  default: "hsl(214, 97%, 59%)",
  primary: "blue",
  secondary: "gray",
  success: "green",

  warning: "orange",

  danger: "red",
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "default",
}) => {
  return (
    <svg
      viewBox="25 25 50 50"
      style={{
        width: sizeMap[size],
        transformOrigin: "center",
        animation: "rotate4 2s linear infinite",
      }}
    >
      <circle
        r="20"
        cy="50"
        cx="50"
        style={{
          fill: "none",
          stroke: colorMap[color],
          strokeWidth: 2,

          strokeDasharray: "1, 200",

          strokeDashoffset: 0,

          strokeLinecap: "round",
          animation: "dash4 1.5s ease-in-out infinite",
        }}
      ></circle>
      <style>
        {`
          @keyframes rotate4 {

            100% {

              transform: rotate(360deg);

            }

          }
          @keyframes dash4 {

            0% {

              stroke-dasharray: 1, 200;

              stroke-dashoffset: 0;

            }
            50% {

              stroke-dasharray: 90, 200;

              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default Spinner;
