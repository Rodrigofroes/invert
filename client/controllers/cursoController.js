import Conexao from "../http/conexao.js";

export default class CursoController {
    async view(req, res) {
        try {
            let con = new Conexao();
            let cursos = await con.cursos();
            res.render("curso/listar", { cursos, msg: null, msgType: null });
        } catch (err) {
            res.render("curso/listar", { 
                cursos: [], 
                msg: "Não foi possível carregar os cursos. Tente novamente mais tarde.", 
                msgType: "danger" 
            });
        }
    }

    async matricula(req, res) {
        try {
            let { id } = req.params;
            if (id) {
                let con = new Conexao();
                let curso = await con.curso(id);
                if (curso){
                    res.render("curso/matricula", { curso: curso.curso, pagamento: curso.pagamento, msg: null, msgType: null  });
                }else {
                    res.render("curso/listar", { 
                        cursos: [], 
                        msg: "Curso não encontrado", 
                        msgType: "warning" 
                    });
                }
            } else {
                res.redirect("curso/listar", { 
                    msg: "Curso não encontrado", 
                    msgType: "warning" 
                });
            }
        } catch (err) {
            res.render("curso/listar", { 
                cursos: [], 
                msg: "Erro ao realizar a matrícula. Tente novamente mais tarde.", 
                msgType: "danger" 
            });
        }
    }

    async matricular(req, res) {
        try{
            let { nome, email, cep, endereco, bairro, cidade, estado, id } = req.body;
            if(nome && email && cep && endereco && bairro && cidade && estado && id){
                let con = new Conexao();
                let mat = await con.matricula(id, nome, email, cep, endereco, bairro, cidade, estado);
                if(mat){
                    res.status(200).json(mat);
                }else{
                    res.status(400).json({msg: "Erro ao realizar a matrícula"});
                }
            }else {
                res.status(400).json({msg: "Dados inválidos"});
            }
        }catch(err){
            res.status(500).json({msg: err.message});
        }
    }
}
