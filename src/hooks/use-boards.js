import { useState, useEffect } from "react";
import getBoards from "../api/get-boards";

export default function useBoards() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getBoards()
      .then((boards) => {
        setBoards(boards);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { boards, isLoading, error };
}