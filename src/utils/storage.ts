
type TSetCookie = {
    expires: number | string | Date
    path?: string
} & {[index: string]: string | number | boolean}

export const setCookie = (name: string, value: string, props?: TSetCookie) => {
    props = {
        path: "/",
        ...props
    } as TSetCookie;
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = Number(d);
    }
    if (exp instanceof Date && exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        /*eslint-disable */
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
        /*eslint-enable */
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}