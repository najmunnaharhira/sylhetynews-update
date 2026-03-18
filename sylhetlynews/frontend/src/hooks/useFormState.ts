import { useCallback } from "react";

/**
 * useFormState - Custom hook for managing simple form state and errors
 * @param initialValues - initial form values
 * @returns [formState, handleChange, setFormState, resetForm, error, setError]
 */
export function useFormState<T extends Record<string, any>>(
  initialValues: T
): [
  T,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [formState, setFormState] = React.useState<T>(initialValues);
  const [error, setError] = React.useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type, checked } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormState(initialValues);
    setError("");
  }, [initialValues]);

  return [formState, handleChange, setFormState, resetForm, error, setError];
}
