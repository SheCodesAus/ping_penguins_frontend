async function postSignup(username, password, email) {
    const url = `${import.meta.env.VITE_API_URL}/user/`;
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "email": email,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to signup`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postSignup;