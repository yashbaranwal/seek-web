import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
