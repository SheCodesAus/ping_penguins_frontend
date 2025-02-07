async function getBoard(boardId) {
  const url = `${import.meta.env.VITE_API_URL}/board/${boardId}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    // Handle the error response more clearly
    const errorMessage = response.status === 404
      ? `Board with ID ${boardId} not found.` // Specific message for 404 errors
      : `Error fetching board with id ${boardId}`;

    const data = await response.json().catch(() => {
      throw new Error(errorMessage);
    });

    throw new Error(data?.detail ?? errorMessage); // Provide fallback error message if necessary
  }

  return await response.json();
}

export default getBoard;

