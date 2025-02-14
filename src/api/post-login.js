const postLogin = async (email, password) => {
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email, 
                password: password
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.non_field_errors?.[0] || 
                data.username?.[0] || 
                data.password?.[0] || 
                'Unable to log in. Please check your email and password.'
            );
        }

        return data;
    } catch (error) {

        throw error;
    }
};

export default postLogin;