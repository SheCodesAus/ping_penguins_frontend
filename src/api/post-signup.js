const postSignup = async (
    workspaceTitle,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    displayName,
    position,
    tenure,
    color,
    bio
) => {
    try {
        // Log the exact data being sent
        const requestData = {
            username: email,
            email,
            password,
            confirm_password: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            display_name: displayName,
            position,
            tenure,
            sticky_note_colour: color,
            bio
        };

        console.log('Sending signup request with data:', requestData);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        // Log the full response for debugging
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
            console.log('Parsed response data:', data);
        } catch (e) {
            console.error('Invalid JSON response:', responseText);
            throw new Error('Invalid server response');
        }

        if (!response.ok) {
            // Log and throw detailed error message
            const errorMessage = data.detail || 
                               Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(', ') ||
                               'Signup failed';
            console.error('Signup error details:', data);
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error('Error in postSignup:', error);
        throw error;
    }
};

export default postSignup;