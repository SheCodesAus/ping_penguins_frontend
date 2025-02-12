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
    console.log('Sending signup data:', {
        workspaceTitle,
        email,
        firstName,
        lastName,
        displayName,
        position,
        tenure,
        color,
        bio
    }); // Log everything except passwords

    try {
        // Use email as both username and email
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username: email, // Use full email as username
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName,
                display_name: displayName,
                position,
                tenure,
                sticky_note_colour: color,
                bio,
                workspace_title: workspaceTitle
            })
        });

        const data = await response.json();
        console.log('Signup response:', data);

        if (!response.ok) {
            console.error('Signup error details:', data);
            
            // Check for existing email error
            if (data.email && data.email[0].includes('already exists')) {
                throw new Error('This email is already registered. Please try logging in instead.');
            }
            
            // Handle other errors
            const errorMessages = [];
            if (data.username) errorMessages.push(`Username: ${data.username[0]}`);
            if (data.sticky_note_colour) errorMessages.push(`Color: ${data.sticky_note_colour[0]}`);
            if (data.email) errorMessages.push(`Email: ${data.email[0]}`);
            if (data.password) errorMessages.push(`Password: ${data.password[0]}`);
            if (data.non_field_errors) errorMessages.push(data.non_field_errors[0]);
            
            throw new Error(errorMessages.join(', ') || 'Failed to create account');
        }

        // Store the email as username for login
        localStorage.setItem('lastUsername', email);
        
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export default postSignup;