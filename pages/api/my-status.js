import {setCookie} from "../../src/utils/cookie";

const jwt = require('jsonwebtoken');

export default function handler(req, res) {
    if (req.method === 'POST') {
        let token = req.cookies.access_token;
        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const username = decoded.data;
                res.status(200).json({
                    "username": username,
                })
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    setCookie(res, 'access_token', null, { httpOnly: true });
                }
                res.status(200).json({
                    "username": null,
                })
            }
        } else {
            res.status(200).json({
                "username": null,
            })
        }
    }
}