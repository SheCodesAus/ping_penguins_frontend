async function postNote(comment, anonymous, board, category) {
  const url = `${import.meta.env.VITE_API_URL}/note/`;
  const token = localStorage.getItem('token');
  
  const requestData = {
    comment: comment,
    anonymous: anonymous,
    category: category
  };

  console.log('Sending note data:', requestData);

  // Validate required fields before making request
  if (!comment) throw new Error("Comment is required");
  if (!board) throw new Error("Board is required");
  if (!category) throw new Error("Category is required");

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(requestData)
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);

    if (!response.ok) {
      throw new Error(`Server error: ${responseText}`);
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error posting note:', error);
    throw error;
  }
}

export default postNote;