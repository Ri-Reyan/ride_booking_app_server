import express from "express";
import UserRegister from "../contollers/user/UserRegister.conteroller.js";
import UserLogin from "../contollers/user/UserLogin.controller.js";
import UserLogout from "../contollers/user/UserLogout.controller.js";
import UserTokenValid from "../contollers/user/UserTokenValid.js";

const router = express.Router();

router.post("/user/register", UserRegister);
router.post("/user/login", UserLogin);
router.post("/user/usertokenvalid", UserTokenValid);
router.get("/user/logout", UserLogout);

export default router;
