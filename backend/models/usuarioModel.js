import Database from "../db/database.js";

const banco = new Database();

export default class UsuarioModel {
    #id;
    #ra;
    #senha;
    #matricula;

    constructor(id, ra, senha, matricula) {
        this.#id = id;
        this.#ra = ra;
        this.#senha = senha;
        this.#matricula = matricula;
    }

    get id() {
        return this.#id;
    }

    get ra() {
        return this.#ra;
    }

    get senha() {
        return this.#senha;
    }

    get matricula() {
        return this.#matricula;
    }

    set id(value) {
        this.#id = value;
    }

    set ra(value) {
        this.#ra = value;
    }

    set senha(value) {
        this.#senha = value;
    }

    set matricula(value) {
        this.#matricula = value;
    }

    async gerarAluno(){
        let ra = '1044' + this.#matricula;
        let senha = '1044';

        let sql = "INSERT INTO tb_usuarioaluno(usa_ra, usa_senha, mat_id) VALUES (?, ?, ?)";
        let valores = [ra, senha, this.#matricula];

        let consulta = await banco.ExecutaComandoNonQuery(sql, valores);

        if(consulta){
            
            let obj = ({
                ra: ra,
                senha: senha
            })

            return obj;
        } else {
            return false;
        }
    }

    async obter(id){
        let sql = "SELECT * FROM tb_usuarioaluno WHERE usa_id = ?";
        let valor = [id];

        let resultado = await banco.ExecutaComando(sql, valor);
        return resultado;
    }

    async obterAcesso(ra, senha){
        let sql = "SELECT * FROM tb_usuarioaluno WHERE usa_ra = ? AND usa_senha = ?";
        let valor = [ra, senha];

        let resultado =  await banco.ExecutaComando(sql, valor);
        return resultado;
    }

    async obterAcessando(id){
        let sql = `SELECT * FROM tb_usuarioaluno 
                   INNER JOIN tb_matricula ON tb_matricula.mat_id = tb_usuarioaluno.mat_id
                   WHERE tb_matricula.mat_cursando = 'S' AND tb_usuarioaluno.usa_id = ?
                   `;
        let valor = [id];
        let consulta = await banco.ExecutaComando(sql, valor);

        return consulta;
    }

    toJSON() {
        return {
            id: this.#id,
            ra: this.#ra,
            matricula: this.#matricula,
        };
    }

}