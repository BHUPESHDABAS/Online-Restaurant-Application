import User from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";

export const verifyjwt = async (req, res, next) => {
    try {
        const incomingRefreshToken = req.cookies.RefreshToken;
        const incomingAccessToken = req.cookies.AcessToken;

        if (!incomingAccessToken || !incomingRefreshToken) {
            return next(new ErrorHandler(401, "You are not authorized. Please login first!"));
        }

        let userInfo;
        try {
            userInfo = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_KEY);
        } catch (error) {
            // If token expired, return 403 instead of crashing
            return next(new ErrorHandler(403, "Access token expired. Please login again!"));
        }

        let user = await User.findById(userInfo.userId);
        if (!user) {
            return next(new ErrorHandler(401, "User not found!"));
        }

        if (incomingRefreshToken !== user.refreshToken) {
            return next(new ErrorHandler(401, "Invalid session. Please login again!"));
        }

        req.user = { id: user._id }; // Store user ID in req.user
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "Internal server error in authentication!"));
    }
};
