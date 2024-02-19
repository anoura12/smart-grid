import {setCookie} from "../../src/utils/cookie";

const jwt = require('jsonwebtoken');
import getDB from "../../src/db";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const db = getDB();
        let token = req.cookies.access_token;

        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const device_id = Number(req.body.device_id);
                const username = decoded.data;
                if(username === 'admin') {
                    let sql = "UPDATE requests set token=? where device_id=?";
                    const data = [0, device_id];
                    db.run(sql, data, function (err) {
                        return res.json("Query executed");
                    });
                }
                return res.json("Unauthorized");
            }catch (err){
                if(err.name==="TokenExpiredError"){
                    setCookie(res, 'access_token', null, { httpOnly: true });
                    res.writeHead(302, {location: "/login"});
                }
            }
        }
    } else {
        return res.status(301).json({ error: 'Invalid request method' })
    }
}