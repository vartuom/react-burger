import React from "react";

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

/*
export const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error(`Network error`)
    }
    const actualData = response.json();
    if (!actualData.success) {
        throw new Error(`Server error`)
    }
    return actualData
}
*/
