import {setCookie} from "../../src/utils/cookie";
const http = require('http')
const jwt = require('jsonwebtoken');
import getDB from "../../src/db";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const db = getDB();
        let token = req.cookies.access_token;
        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const username = decoded.data;

                const d = JSON.parse(req.body);

                const device_id = parseInt(d.serial_number);
                const reason = d.message;

                let sql = "INSERT INTO requests (username, device_id, reason) values (?,?,?)";
                const data = [username, device_id, reason];
                http.get('http://localhost:5000/');
                db.run(sql, data, function (err) {
                    if(err){
                    res.status(200).send({
                        error: err.message
                    })
                    }
                });
                res.status(200).json({ "message": "Request sent" });
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