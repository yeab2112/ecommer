import jwt from "jsonwebtoken";

const authoAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, login again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authoAdmin;
