async function updateUser(email, password, userId) {
    const url = `${import.meta.env.VITE_API_URL}/user/${userId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to update user`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default updateUser;