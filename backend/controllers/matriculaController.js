import MatriculaModel from "../models/matriculaModel.js";
import MensalidadeModel from "../models/mensalidadeModel.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class MatriculaController {
    async matricula(req, res) {
        try {
            let { nome, email, cep, endereco, bairro, cidade, estado, curso } = req.body;
            if (nome && email && cep && endereco && bairro && cidade && estado && curso && curso.id > 0) {
                let matriculaModel = new MatriculaModel(0, nome, email, cep, endereco, bairro, cidade, estado, curso);
                let cadastro = await matriculaModel.matricula();
                if (cadastro) {
                    let id = cadastro;
                    let mensalidadeModel = new MensalidadeModel(0, "", "", "", id);
                    let mensalidade = await mensalidadeModel.gerarMatricula(curso.id);
                    if (mensalidade) {
                        let usuarioModel = new UsuarioModel(0, "", "", id);
                        let usuario = await usuarioModel.gerarAluno();
                        if (usuario) {
                            res.status(201).json({
                                RA: usuario.ra,
                                Senha: usuario.senha
                            })
                        } else {
                            throw new Error("Erro ao gerar matrícula!")
                        }
                    } else {
                        throw new Error("Erro ao gerar matrícula!")
                    }
                } else {
                    res.status(400).json({
                        msg: "Erro ao matricular!"
                    });
                }
            } else {
                res.status(400).json({
                    msg: "Parametros invalidos!"
                });
            }
        } catch (ex) {
            res.status(500).json({
                msg: ex.message
            })
        }
    }
}