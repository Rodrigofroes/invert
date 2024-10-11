import jwt from "jsonwebtoken";
import UsuarioModel from "../models/usuarioModel.js";

const SECRET = "!@SDAD@#@#@#SDADWA";

export default class AuthMiddleware {
    gerarToken(usuario) {
        let payload = {
            id: usuario[0].usa_id,
            ra: usuario[0].usa_ra,
        }

        let token = jwt.sign(payload, SECRET, {
            expiresIn: '1h'
        });

        return token;
    }

    async validar(req, res, next) {
        let token = req.headers.authorization.split(" ")[1]
        if (token) {
            try {
                let objUsuario = jwt.verify(token, SECRET);
                let usuario = new UsuarioModel();
                usuario = await usuario.obter(objUsuario.id);
                if (usuario) {
                    next();
                }
                else {
                    res.status(401).json({ msg: "Não autorizado!" });
                }
            }
            catch (ex) {
                res.status(401).json({ msg: "Não autorizado!" });
            }
        }
        else {
            res.status(401).json({ msg: "Não autorizado!" });
        }
    }

    decode(token) {
        if (token) {
            let deocde = jwt.decode(token);
            return deocde;
        } else {
            res.status(401).json({ msg: "Não autorizado!" });
        }
    }
}