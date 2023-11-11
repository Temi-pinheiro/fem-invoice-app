import { useState } from 'react';

export function useForm<T>({
  initial,
  useErrors,
  data,
  schema,
}: {
  initial?: T;
  useErrors?: boolean;
  data?: T;
  schema?: {
    [fieldName: string]: {
      rules: {
        rule: string;
        value: any;
        message: string;
      }[];
    };
  };
}) {
  //() => currStep || 3
  const [formData, setFormData] = useState<T | Partial<T>>(() =>
    useErrors ? { ...data } : { ...initial }
  );
  const [errors, setErrors] = useState<any>({});

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: type == 'number' ? Number(value) : value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const errorCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: formValue }: { name: string; value: any } = e.target;

    const targetSchema = schema?.[name];
    if (!targetSchema) return;
    targetSchema?.rules.map(({ rule, value, message }) => {
      switch (rule) {
        case 'required': {
          if (formValue) break;
          setErrors((prev: any) => ({ ...prev, [name]: message }));
          break;
        }
        case 'pattern': {
          if (new RegExp(value).test(formValue)) break;
          setErrors((prev: any) => ({ ...prev, [name]: message }));
          break;
        }
        default:
          break;
      }
    });
    // const newErrors: any = {};

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   return;
    // }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation logic goes here

    // Make API request or perform submission logic
  };

  return {
    formData,
    check: errorCheck,
    update: updateFormData,
    errors,
    setErrors,
    submit: handleSubmit,
  };
}
