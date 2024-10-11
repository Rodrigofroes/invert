import PagamentoAdapter from "../adapter/stripe.js";
import CursoModel from "../models/cursoModel.js";

export class CursoController {
    async listar(req, res) {
        try {
            let cusroModel = new CursoModel();
            let curso = await cusroModel.listar();
            if (curso && curso.length > 0) {
                res.status(200).json(curso);
            } else {
                res.status(400).json({
                    msg: "Erro ao consultar!"
                });
            }
        } catch (ex) {
            res.status(500).json({
                msg: ex.message
            });
        }
    }

    async obter(req, res) {
        try {
            let { id } = req.params;

            let cusroModel = new CursoModel();
            let curso = await cusroModel.obter(id);
            if (curso && curso.length > 0) {
                let str = new PagamentoAdapter();
                let pagamento = await str.pagamento(curso[0].valor, curso[0].nome);
                if (pagamento) {    
                    res.status(200).json({
                        curso: curso,
                        pagamento: pagamento
                    });
                } else {
                    res.status(400).json({
                        msg: "Erro ao consultar!"
                    });
                }
            } else {
                res.status(400).json({
                    msg: "Erro ao consultar!"
                });
            }
        } catch (ex) {
            res.status(500).json({
                msg: ex.message
            });
        }
    }
}