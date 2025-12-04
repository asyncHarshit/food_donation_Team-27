import jwt from "jsonwebtoken";

// ---------------- Authenticate User ----------------
export const auth = (req, res, next) => {
    try {
        const token = req.cookies.token; // JWT from cookie

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach id & role to request
        next();

    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// ---------------- Admin Authorization ----------------
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
};
