import { useState } from "react";

/**
 * useFormState - A reusable hook for managing form state and input changes.
 * @param initialValues - The initial values for the form fields.
 * @returns { values, handleChange, setValues, resetForm }
 */
export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetForm() {
    setValues(initialValues);
  }

  return { values, handleChange, setValues, resetForm };
}
