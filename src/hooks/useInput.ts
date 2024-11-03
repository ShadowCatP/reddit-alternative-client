import { useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void,
  ) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  const reset = () => {
    setValue("");
  };

  return { value, handleChange, handleKeyDown, reset };
};
