async function postNote(name, comment) {
    const url = `${import.meta.env.VITE_API_URL}/note/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
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
      const fallbackError = `Error trying to create note`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postNote;