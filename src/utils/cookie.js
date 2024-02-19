import {serialize} from "cookie";

export const setCookie = (res, name, value, options = {}) => {
    const stringValue =
            typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

    if ('maxAge' in options) {
        let now = new Date();
        now.setTime(now.getTime() + options.maxAge * 1000);
        options.expires = new Date(now)
        delete(options.maxAge)
    }
    res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}