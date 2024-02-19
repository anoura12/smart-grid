import {setCookie} from "../../src/utils/cookie";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import getDB from "../../src/db";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const db = getDB();
        const password = req.query.password;
        const token = req.cookies.access_token;
        if(token) {
            try{
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                const username = decoded.data;
                bcrypt.hash(password, 10, (err, hash) => {
                    let sql = "UPDATE login set password=? where username=?";
                    const data = [hash, username];
                    db.run(sql, data, function (err) {
                        if (err) {
                            return res
                                .json({error:err.message});
                        }
                        else{
                            return res.json({"status":"password changed"});
                        }
                    })
                });
            }catch(err){
                if(err.name === "TokenExpiredError"){
                    setCookie(res, 'access_token', null, { httpOnly: true });
                    res.writeHead(302, {location: "/login"});
                    // todo - handle other exceptions
                }
            }
        }
    } else {
        return res.status(301).json({ error: 'Invalid request method' });
    }
}
