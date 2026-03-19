import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => (
  <div className="admin-control">
    {label && (
      <label htmlFor={props.id} className="admin-label">
        {label}
      </label>
    )}
    <input
      {...props}
      aria-invalid={Boolean(error) || props["aria-invalid"]}
      className={["admin-input", className].filter(Boolean).join(" ")}
    />
    {error && <div className="admin-error">{error}</div>}
  </div>
);
