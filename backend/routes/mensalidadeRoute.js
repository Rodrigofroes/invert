import Express from 'express';
import MensalidadeController from '../controllers/mensalidadeController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = Express.Router();
const crtl = new MensalidadeController();
const auth = new AuthMiddleware();

router.get('/', auth.validar, (req, res) => {
     /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Mensalidade']
    //#swagger.summary = 'Consultar Mensalidade'
    crtl.mensalidade(req, res);
});

export default router;