import React, { useEffect, useState } from "react";
import { typeData } from "../types/generalTypes";

export function useFetch(url: string | URL) {
  const [data, setData] = useState<typeData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(Array.isArray(json) ? json : [json]);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
}
