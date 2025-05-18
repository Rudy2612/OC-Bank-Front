

const API_URL = 'http://localhost:3001/api/v1';

export const signInUser = async (email, password) => {
    try {
        if (!email || !password)
            throw new Error('Le nom d’utilisateur et le mot de passe sont obligatoires.')

        let payload = {
            email: email,
            password: password
        }
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            let errorMessage = 'Erreur réseau';
            if (response.status === 400) {
                errorMessage = 'Les identifiants sont invalides';
            }
            return { success: false, message: errorMessage };
        }

        const data = await response.json();
        const token = data.body.token;
        return { success: true, token: `Bearer ${token}` };

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message ? error.message : 'Une erreur s’est produite. Veuillez réessayer.' };
    }
};

export const updateInformation = async (firstName, lastName, token) => {
    try {
        if (!firstName || !lastName || !token) {
            throw new Error('Toutes les données ne sont pas renseignés')
        }

        let payload = {
            firstName: firstName,
            lastName: lastName
        }
        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            let errorMessage = 'Erreur réseau';
            if (response.status === 400) {
                errorMessage = 'Les identifiants sont invalides';
            }
            return { success: false, message: errorMessage };
        }

        return { success: true };

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message ? error.message : 'Une erreur s’est produite. Veuillez réessayer.' };
    }
};