async function updateBoard(boardData, boardUUID, token) {
    const url = `${import.meta.env.VITE_API_URL}/board/${boardUUID}/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        boardData,
        boardUUID,
        token,
        category: boardData.category
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to update board`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default updateBoard;