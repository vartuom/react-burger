import {baseUrl} from "./constants";
import {setCookie} from "./storage";
import {cookiesLifeTime} from "./constants";

export const requestPasswordReset = async (email: string) => {
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
    const data = await checkResponse(response);
    // enter you logic when the fetch is successful
    return data;
}

export const resetUsrPassword = async (password: string, code: string) => {
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
    const data = await checkResponse(response);
    // enter you logic when the fetch is successful
    return data;
}

export const checkResponse = (res: Response) => {
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

export const fetchWithRefresh = async (url: string, options: Record<string, any>) => {
    try {
        const res = await fetch(url, options);
        const data = await checkResponse(res);
        return data
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired" || "jwt malformed") {
            const refreshedData = await refreshToken();
            if (!refreshedData.success) {
                return Promise.reject(refreshedData)
            }
            localStorage.setItem('refreshToken', refreshedData.refreshToken)
            setCookie('accessToken', refreshedData.accessToken.split('Bearer ')[1], {expires: cookiesLifeTime});
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

