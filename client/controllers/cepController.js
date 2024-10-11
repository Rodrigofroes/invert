import Conexao from "../http/conexao.js";

export default class CepController {
    async consultarCep(req, res){
        try{
            let { cep } = req.params;
            if(cep){
                let con = new Conexao();
                let dados = await con.cep(cep);
                if(dados){
                    res.status(200).json(dados);
                }else {
                    res.status(400).json({erro: "CEP não encontrado"});
                }
            }else {
                res.status(400).json({erro: "CEP não informado"});
            }
        }catch(err){
            res.status(500).json({erro: err.message});
        }
    }
}