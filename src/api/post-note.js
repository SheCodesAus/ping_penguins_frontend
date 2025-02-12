async function postNote(comment, anonymous, selectedCategoryId) {
  const url = `${import.meta.env.VITE_API_URL}/note/`;
  const token = localStorage.getItem('token');

  const requestData = {
    comment: comment,
    anonymous: anonymous,
    category: activeCategoryId // Attach dynamically from the active tab
  };

  console.log('Sending note data:', requestData);

  // Validate required fields before making request
  if (!comment) throw new Error("Comment is required");

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Server error: ${responseText}`);
    }

    const data = await response.json();
    console.log('Posted note:', data);
    return data; // Should include category name and user
  } catch (error) {
    console.error('Error posting note:', error);
    throw error;
  }
}

export default postNote;