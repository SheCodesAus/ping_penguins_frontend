async function postNote(comment, anonymous, board, category) {
  const url = `${import.meta.env.VITE_API_URL}/note/`;
  const token = window.localStorage.getItem("token");
  
  console.log('PostNote called with:', {
    comment,
    anonymous,
    board,
    category,
    url,
    token: token ? 'exists' : 'missing'
  });

  // Validate required fields before making request
  if (!comment) throw new Error("Comment is required");
  if (!board) throw new Error("Board is required");
  if (!category) throw new Error("Category is required");

  const requestBody = {
    comment: comment,
    anonymous: anonymous || false,
    board: board,
    category: category
  };

  console.log('Sending request with body:', requestBody);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    
    let data;
    try {
      data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error("Invalid response from server");
    }

    if (!response.ok) {
      const errorMessages = [];
      
      // Handle specific field errors
      if (data.comment) errorMessages.push("Comment: " + data.comment[0]);
      if (data.board) errorMessages.push("Board: " + data.board[0]);
      if (data.category) errorMessages.push("Category: " + data.category[0]);
      
      // If we have specific errors, throw those
      if (errorMessages.length > 0) {
        throw new Error(errorMessages.join(", "));
      }

      // Otherwise throw the general error
      throw new Error(data?.detail ?? "Failed to post note");
    }

    return data;
  } catch (error) {
    console.error('Network or other error:', error);
    throw error;
  }
}

export default postNote;