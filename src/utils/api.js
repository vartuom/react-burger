import {baseUrl} from "./constants";

export const requestPasswordReset = async (email) => {
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
    return data;
}

export const resetUsrPassword = async (password, code) => {
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
    return data;
}

