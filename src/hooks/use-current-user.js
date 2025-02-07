import { useState, useEffect } from "react";
import getUser from "../api/get-user";

export default function useCurrentUser(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await getUser(userId, { signal: controller.signal });
        setUser(user);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [userId]);

  return { user, isLoading, error };
}
