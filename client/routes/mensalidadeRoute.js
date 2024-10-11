import express from "express";
import MensalidadeController from "../controllers/mesalidadeController.js";

const router = express.Router();
const crtl = new MensalidadeController();

router.get('/', crtl.view);

export default router;