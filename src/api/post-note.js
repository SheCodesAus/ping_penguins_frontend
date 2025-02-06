async function postNote(comment, anonymous, board, category, owner) {
  const url = `${import.meta.env.VITE_API_URL}/note/`;
  const token = window.localStorage.getItem("token");
  const currentUser = window.localStorage.getItem("userId");
  
  // Validate required fields before making request
  if (!comment) throw new Error("Comment is required");
  if (!board) throw new Error("Board is required");
  if (!currentUser) throw new Error("Owner is required");

  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
      },
      body: JSON.stringify({
          comment: comment,
          anonymous,
          board,
          category,
          owner: currentUser
      }),
  });

  let data;
  try {
      data = await response.json();
  } catch (error) {
      throw new Error("Invalid response from server");
  }

  if (!response.ok) {
      const errorMessages = [];
      
      // Handle specific field errors
      if (data.comment) errorMessages.push("Comment: " + data.comment[0]);
      if (data.board) errorMessages.push("Board: " + data.board[0]);
      if (data.owner) errorMessages.push("Owner: " + data.owner[0]);
      if (data.category) errorMessages.push("Category: " + data.category[0]);
      
      // If we have specific errors, throw those
      if (errorMessages.length > 0) {
          throw new Error(errorMessages.join(", "));
      }

      // Otherwise throw the general error
      throw new Error(data?.detail ?? "Failed to post note");
  }

  return data;
}

export default postNote;