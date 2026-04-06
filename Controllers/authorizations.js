const jwt = require("jsonwebtoken");
exports.checkauth = (allowedroles) => {
    return (req, res, next) => {
        try{
            const token=req.cookies.token;
            if(!token) {
                return res.status(401).json({
                    message: "User Not Logged In",
                    success: false,
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (!req.user.role || !allowedroles.includes(req.user.role)) {
                return res.status(401).json({
                    message: "Insufficient Permissions",
                    success: false,
                });
            }
            next();
        } catch (error) {
            console.log("Error While Authorizing User ", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    };
};
exports.authenticate = async (req, res) => {
  return res.status(200).json({
    message: "User Authenticated Successfully",
    success: true,
  });
};
