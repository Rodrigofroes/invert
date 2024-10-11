import express from "express";
import CursoController from "../controllers/cursoController.js";

const router = express.Router();
const ctrl = new CursoController();

router.get("/", ctrl.view);
router.get("/matricula/:id", ctrl.matricula);
router.post("/cadastrar", ctrl.matricular);

export default router;