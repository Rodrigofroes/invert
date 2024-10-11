import Express from 'express';
import { CursoController } from '../controllers/cursoController.js';

const router = Express.Router();
const crtl = new CursoController();

router.get('/', (req, res) => {
    //#swagger.tags = ['Cursos']
    //#swagger.summary = 'Lista de cusrsos'
    crtl.listar(req, res);
});

router.get('/:id', (req, res) => {
    //#swagger.tags = ['Cursos']
    //#swagger.summary = 'Lista de cusrsos'
    crtl.obter(req, res);
});

export default router;