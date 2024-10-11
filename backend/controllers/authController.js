import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class AuthController{
    async auth(req, res){
        try{
            let {ra, senha} = req.body;
            if(ra && senha){
                let usuarioModel = new UsuarioModel();
                let usuario = await usuarioModel.obterAcesso(ra, senha);
                if(usuario && usuario.length > 0){
                    let auth = new AuthMiddleware();
                    let token = auth.gerarToken(usuario);
                    res.status(200).json({
                        token: token
                    });
                }else {
                    res.status(400).json({
                        msg: "Usuário não encontrado!"
                    })
                }
            }else {
                res.status(400).json({
                    msg: "Parametros invalidos!"
                })
            }
        }catch(ex){
            res.status(500).json({
                msg: ex.message
            })
        }
    }
}