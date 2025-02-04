async function postSignup(username, email, password, confirm_password, first_name, last_name, display_name, position, gender, tenure, age, sticky_note_colour) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;
  const token = window.localStorage.getItem("token");
  
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
      },
      body: JSON.stringify({
          username:first_name,
          email,
          password,
          confirm_password,
          first_name,
          last_name,
          display_name,
          position,
          gender,
          tenure,
          age,
          sticky_note_colour
      }),
  });

  const data = await response.json();

  if (!response.ok) {
      const fallbackError = 'An error occurred during registration';
      const errorMessage = [];

      // Handle specific validation errors
      if (data.confirm_password) {
          throw new Error(data.confirm_password[0]);
      }
      if (data.username) {
          throw new Error('Username already exists');
      }
      if (data.email) {
          throw new Error('Email already registered');
      }

      // If we reach here, throw the general error
      throw new Error(data?.detail ?? fallbackError);
  }

  return data;
}

export default postSignup;