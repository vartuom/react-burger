import {baseUrl} from "./constants";
import {setCookie} from "./storage";

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

export const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
}

export const refreshToken = () => {
    return fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }).then(checkResponse)
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        const data = await checkResponse(res);
        return data
    } catch (err) {
        if (err.message === "jwt expired" || "jwt malformed") {
            console.log(err.message);
            const refreshedData = await refreshToken();
            if (!refreshedData.success) {
                return Promise.reject(refreshedData)
            }
            localStorage.setItem('refreshToken', refreshedData.refreshToken)
            setCookie('accessToken', refreshedData.accessToken.split('Bearer ')[1], {expires: 3});
            console.log('new token ' + refreshedData.accessToken);
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: refreshedData.accessToken
                }
            })
            const data = await checkResponse(res);
            return data
        } else {
            return Promise.reject(err);
        }
    }
}

