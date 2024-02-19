import {setCookie} from "../../src/utils/cookie";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import getDB from "../../src/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const db = getDB();
    const username = req.query.username;
    const password = req.query.password;
    let login_query = "SELECT * FROM LOGIN where username= ?";
    return db.get(login_query, [username], (err, row) =>{
      if (err) {
        return res.status(403).json({ error: 'Invalid Username' })
      } else if (row) {
        bcrypt.compare(password, row.password, function (err, response){
          if (response === true){
            const token = jwt.sign(
                { data: username },
                process.env.JWT_SECRET,
                { expiresIn: '1hr' }
            );
            setCookie(res, 'access_token', token, { path:"/", httpOnly:true, maxAge: 3600 });
            return res.status(200).json({ "token": token });
          }
          else {
            return res.json({ error: "Invalid password" });
          }
        });
      } else {
        return res.status(200).json({ error: 'Invalid Username' })
      }
    });
  } else {
    return res.status(200).json({ error: 'Invalid request method' })
  }
}
