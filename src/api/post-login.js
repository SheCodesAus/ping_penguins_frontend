const postLogin = async (email, password) => {
    console.log('Attempting login with:', { email }); // Debug log
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email, // Use full email as username
                password: password
            })
        });

        const data = await response.json();
        console.log('Server response:', data);

        if (!response.ok) {
            console.error('Login error details:', data);
            throw new Error(
                data.non_field_errors?.[0] || 
                data.username?.[0] || 
                data.password?.[0] || 
                'Unable to log in. Please check your email and password.'
            );
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export default postLogin;