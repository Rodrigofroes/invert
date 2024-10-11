import Conexao from "../http/conexao.js";

export default class MensalidadeController {
    async view(req, res) {
        try {
            let token = req.cookies.token;
            let con = new Conexao();
            let mensalidade = await con.mensalidade(token);
            if (mensalidade) {
                res.render('mensalidade/mensalidade', { mensalidade, msg: null, msgType: null, layout: 'semLayout' });
            } else {
                res.render('mensalidade/mensalidade', {
                    mensalidade: [],
                    msg: "Não foi possível carregar as mensalidades. Tente novamente mais tarde.",
                    msgType: "warning"
                });
            }
        } catch (ex) {
            res.render('mensalidade/mensalidade', {
                mensalidade: [],
                msg: ex.message,
                msgType: "danger"
            });
        }
    }
}