async function postBoard(title, description) {
    const url = `${import.meta.env.VITE_API_URL}/board/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
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
      const fallbackError = `Error trying to create board`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postBoard;