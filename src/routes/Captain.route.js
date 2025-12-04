import express from "express";
import CaptainRegister from "../contollers/captain/CaptainRegister.controller.js";
import CaptainLogin from "../contollers/captain/CaptainLogin.controler.js";
import CaptainTokenValid from "../contollers/captain/CaptainTokenValid.js";
import CaptainLogout from "../contollers/captain/CaptainLogout.controller.js";

const router = express.Router();

router.post("/captain/register", CaptainRegister);
router.post("/captain/login", CaptainLogin);
router.post("/captain/captaintokenvalid", CaptainTokenValid);
router.get("/captain/logout", CaptainLogout);
export default router;
