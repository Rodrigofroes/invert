import express from "express";
import LoginController from "../controllers/loginController.js";

const router = express.Router();
const crtl = new LoginController();

router.get('/', crtl.view);
router.post('/', crtl.login);

export default router;