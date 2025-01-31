async function postCategories(title, boardUUID, token) {
    const url = `${import.meta.env.VITE_API_URL}/category/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        "title": title,
        boardUUID,
        token
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to create category`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postCategories;