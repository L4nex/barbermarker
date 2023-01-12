import axios from "axios";

export function verifyToken(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="${token}"`).then((response) => {
        next();
    })
    
}