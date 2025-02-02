import express from "express";
import { getGetUser, postLogin, postSignup } from "../controllers/auth.js";
import upload from "../utils/multer.js";
import { verifyjwt } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post('/signup', upload.single("image"), postSignup);
router.post('/login', postLogin);

router.get("/getuser", verifyjwt, getGetUser);

export default router;


