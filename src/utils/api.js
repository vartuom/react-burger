import {baseUrl} from "./constants";

export const registerUser = async (email, password, username) => {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // your expected POST request payload goes here
                email: email,
                password: password,
                name: username
            })
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера!')
        }
        const data = await response.json();
        // enter you logic when the fetch is successful
        console.log(data);
    } catch(error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}

export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // your expected POST request payload goes here
                email: email
            })
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера!')
        }
        const data = await response.json();
        // enter you logic when the fetch is successful
        console.log(data);
    } catch(error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}

export const resetUsrPassword = async (password, code) => {
    try {
        const response = await fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // your expected POST request payload goes here
                password: password,
                token: code
            })
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера!')
        }
        const data = await response.json();
        // enter you logic when the fetch is successful
        console.log(data);
    } catch(error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}

