import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader Missing================>", authHeader);
        console.log("JWT_SECRET=========>", process.env.JWT_SECRET);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please login to access this resource",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        console.log("token Missing======================>", token);
        if (!token) {
            res.status(401).json({
                message: "Token not provided",
            });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodedValue Missing=========================>", decodedValue);
        if (decodedValue.user) {
            req.user = decodedValue.user;
        }
        else if (decodedValue.id) {
            req.user = {
                _id: decodedValue.id,
                name: "",
                email: "",
            };
        }
        else {
            res.status(401).json({
                message: "Invalid token",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({
            message: error.name === "TokenExpiredError" ? "Token Expired" : "Invalid Token",
        });
    }
};
//# sourceMappingURL=isAuth.middleware.js.map