import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: "Invalid token" });
    }
};

export const verifyAdmin = (req, res, next) => {
    // Temporarily allow access for testing, assuming user is admin
    req.user = { isAdmin: true };  // You can remove this after testing
    next();
};



