import express from "express";
import CepController from "../controllers/cepController.js";


const router = express.Router();
const ctrl = new CepController();

router.get("/:cep", ctrl.consultarCep);

export default router;