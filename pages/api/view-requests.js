import getDB from "../../src/db";
import jwt from "jsonwebtoken";
import {setCookie} from "../../src/utils/cookie";

export default function handler(req, res) {
    const db = getDB();
    let token = req.cookies.access_token;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.data;
            if(username === 'admin'){
                let sql = "SELECT * FROM requests WHERE token IS NULL";
                db.all(sql, function (err, row) {
                    res.status(200).json({
                        requests: row,
                        isAdmin: true
                    });
                });
            }else{
                let sql = "SELECT * FROM requests WHERE username=? and token IS NULL";
                let data = [username]
                db.all(sql, data, function (err, row) {
                    res.status(200).json({
                        requests: row,
                        isAdmin: false
                    });
                });
            }
        } catch (err){
            if(err.name==="TokenExpiredError"){
                setCookie(res, 'access_token', null, { httpOnly: true });
                res.writeHead(302, {location: "/login"});
            }
        }
    } else {
        res.status(302).json({error: "You are not logged in"});
    }
}