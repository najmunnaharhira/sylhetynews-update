import React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded font-semibold transition",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        loading && "opacity-60 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner mr-2" /> : null}
      {children}
    </button>
  );
};
