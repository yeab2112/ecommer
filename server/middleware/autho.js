import jwt from "jsonwebtoken";
import { UserM } from "../moduls/user.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

export const verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            try {
                if (err) {
                    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
                }

                const user = await UserM.findOne({ _id: payload._id });

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                req.user = user;
                next();
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    } else {
        return res.status(403).json({ error: 'Forbidden' });
    }
};
