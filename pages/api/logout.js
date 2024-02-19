import {setCookie} from "../../src/utils/cookie";

export default function handler(req, res) {
    if (req.method === 'POST') {
        setCookie(res, 'access_token',"",{ path:"/", httpOnly:true, maxAge: 0 });
        return res.status(200).json({ success: true });
    } else {
        return res.status(200).json({ error: 'Invalid request method' })
    }
}
