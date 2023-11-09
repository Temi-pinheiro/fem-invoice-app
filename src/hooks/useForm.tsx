import { useState } from 'react';

export function useForm<T>({
  submitFunction,
  initial,
  useErrors,
  data,
}: {
  submitFunction: (v?: any) => void;
  initial?: T;
  useErrors?: boolean;
  data?: T;
  schema?: {
    [fieldName: string]: {
      [rule: string]: {
        value: any;
        message: string;
      };
    };
  };
}) {
  //() => currStep || 3
  const [formData, setFormData] = useState<T | Partial<T>>(() =>
    useErrors ? { ...data } : { ...initial }
  );
  const [errors, setErrors] = useState({});

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation logic goes here

    const newErrors: any = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submitFunction();
    }
    // Make API request or perform submission logic
  };

  return {
    formData,
    update: updateFormData,
    errors,
    setErrors,
    submit: handleSubmit,
  };
}
