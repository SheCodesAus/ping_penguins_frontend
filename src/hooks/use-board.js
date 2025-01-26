import { useState, useEffect } from "react";

import getBoard from "../api/get-board";

export default function useBoard(boardId) {
  const [board, setBoard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getBoard(boardId)
      .then((board) => {
        setBoard(board);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [boardId]);

  return { board, isLoading, error };
}