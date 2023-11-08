import React from "react";

const Button = ({ className, children, ...buttonProps }) => {
  return (
    <div className={className}>
      <button
        {...buttonProps}
        className="select-none  flex items-center justify-center gap-x-2"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
