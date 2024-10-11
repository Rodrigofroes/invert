import AuthMiddleware from "../middlewares/authMiddleware.js";
import MensalidadeModel from "../models/mensalidadeModel.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class MensalidadeController {
    async mensalidade(req, res) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            let authMiddleware = new AuthMiddleware();
            let decode = authMiddleware.decode(token);
            if (decode) {
                let usuarioModel = new UsuarioModel();
                let usuario = await usuarioModel.obterAcessando(decode.id);
                if (usuario && usuario.length > 0) {
                    let mensalidadeModel = new MensalidadeModel();
                    let mensalidade = await mensalidadeModel.mensalidade(decode.id);
                    if (mensalidade) {
                        res.status(200).json(mensalidade);
                    } else {
                        res.status(400).json({
                            msg: "Erro mensalidade não encontrada!"
                        });
                    }
                } else {
                    res.status(400).json({
                        msg: "Usuário não está matrículado!"
                    });
                }
            } else {
                throw new Error("Token é obrigatorio!");
            }
        } catch (ex) {
            res.status(500).json({
                msg: ex.message
            })
        }
    }
}