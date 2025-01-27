async function updateBoard(title, description, boardId) {
    const url = `${import.meta.env.VITE_API_URL}/board/${boardId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
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