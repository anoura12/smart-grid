import {setCookie} from "../../src/utils/cookie";

const jwt = require('jsonwebtoken');

export default function handler(req, res) {
    if (req.method === 'GET') {
        let token = req.cookies.access_token;
        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const username = decoded.data;

                if (username === 'admin') {
                    res.json({
                        "flag":"flag{93dfa544bef8a1295428998c1b50ab8a53435073eecfcf7b8ffca0001a75b4ec}"
                    })
                } else {
                    res.json({
                        "response":"Not authorized"
                    })
                }
                res.status(200);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    setCookie(res, 'access_token', null, { httpOnly: true });
                    res.writeHead(302, {location: "/login"});
                }
                // todo - Handle invalid tokens
            }
        } else {
            res.json({
                "response":"Not authorized"
            })
        }
    }
}