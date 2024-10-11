import Conexao from "../http/conexao.js";

export default class LoginController{
    view(req, res){
        res.render('login/login');
    }

    async login(req, res){
        try{
            let { ra, senha } = req.body;
            if(ra && senha){
                let con = new Conexao();
                let login = await con.login(ra, senha);
                if(login){
                    res.status(200).json(login);
                }else {
                    res.status(400).json({erro: "RA e/ou senha inválidos"});
                }
            }else {
                res.status(400).json({erro: "RA e/ou senha não informados"});
            }
        }catch(err){
            res.status(500).json({erro: err.message});
        }
    }
}