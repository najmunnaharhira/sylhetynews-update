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
        "admin-button",
        `admin-button-${variant}`,
        loading && "is-loading",
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
