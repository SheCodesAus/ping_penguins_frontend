async function postBoard(title, description, disclaimer, date_start, date_end, image) {
  const url = `${import.meta.env.VITE_API_URL}/board/`;
  const token = window.localStorage.getItem("token");
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
    },
    body: JSON.stringify({
        title: title,
        description: description,
        disclaimer: disclaimer,
        date_start: date_start,
        date_end: date_end,
        image: image,
    })
});

if (!response.ok) {
  // Parse the backend error response
  const data = await response.json().catch(() => {
      throw new Error('Error trying to create new Board');
  });

  // Extract specific field missing errors to return to the user - Only image error is working.  Need to review and possibly make general "required information is missing" error
  const errorMessages = [];
      if (data.title) errorMessages.push("Title is required.");
      if (data.description) errorMessages.push("Description is required.");
      if (data.date_start) errorMessages.push("Date start is required.");
      if (data.date_end) errorMessages.push("Date end is required.");
  
  // If there any multiple fields missing, throw them combined
  if (errorMessages.length > 0) {
      throw new Error(errorMessages.join(' '));
  }

  // Fallback for other errors
  const fallbackError = data?.detail ?? 'Error trying to create a new Board';
  throw new Error(fallbackError);
}
return await response.json();
}

  export default postBoard;