import Express from 'express';
import MatriculaController from '../controllers/matriculaController.js';

const router = Express.Router();
const crtl = new MatriculaController();

router.post('/', (req, res) => {

    //#swagger.tags = ['Matrícula ']
    //#swagger.summary = 'Cadastra uma Matrícula '
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/matriculaModel"
                    }  
                }
            }
        } 
    */

    crtl.matricula(req, res);
});

export default router;