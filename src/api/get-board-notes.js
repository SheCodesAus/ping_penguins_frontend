async function getBoardNotes(boardId) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/board/${boardId}/notes/`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

export default getBoardNotes;