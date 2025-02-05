import { useState, useEffect } from "react";
import getUser from "../api/get-user";

export default function useCurrentUser(userId) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getUser(userId)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [userId]);

  return { user, isLoading, error };
}