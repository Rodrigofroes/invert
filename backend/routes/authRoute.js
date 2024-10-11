import Express from 'express';
import AuthController from '../controllers/authController.js';

const router = Express.Router();
const crtl = new AuthController();

router.post('/', (req, res) => {
     /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Auth']
    //#swagger.summary = 'Autenticação de acesso'
    crtl.auth(req, res);
})

export default router;