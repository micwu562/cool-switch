import React from "react";
import "./button.css";

interface buttonProps {
  disabled?: boolean;
  flipped?: boolean;
  onClick?: () => void;
  fillColor?: string;
}

function Button({ flipped, disabled, onClick, fillColor }: buttonProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (!disabled && onClick) onClick();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        style={{
          fill: fillColor || "rgba(0, 0, 0, 1)",
          rotate: flipped ? "180deg" : "0",
        }}
      >
        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
      </svg>
    </button>
  );
}

export default Button;
