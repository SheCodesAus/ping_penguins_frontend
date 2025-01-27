async function updateNote(name, comment, noteId) {
    const url = `${import.meta.env.VITE_API_URL}/note/${noteId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        "name": name,
        "comment": comment,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to update note`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default updateNote;