import Database from '../db/database.js';
const banco = new Database();

export default class CursoModel {
    #id;
    #nome;
    #valor;

    constructor(id, nome, valor) {
        this.#id = id;
        this.#nome = nome;
        this.#valor = valor;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get valor() {
        return this.#valor;
    }

    set id(value) {
        this.#id = value;
    }

    set nome(value) {
        this.#nome = value;
    }

    set valor(value) {
        this.#valor = value;
    }

    async listar() {
        let sql = "SELECT * FROM tb_curso";
        let rows = await banco.ExecutaComando(sql);
        return this.toMAP(rows);
    }

    async obter(id) {
        let sql = `SELECT * FROM tb_curso WHERE cur_id = ?`;
        let rows = await banco.ExecutaComando(sql, [id]);
        return this.toMAP(rows);
    }

    toMAP(rows) {
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let obj = new CursoModel();
            obj.#id = rows[i]['cur_id'];
            obj.#nome = rows[i]['cur_nome'];
            obj.#valor = rows[i]['cur_valor'];

            lista.push(obj);
        }

        if (lista.length > 0) {
            return lista;
        } else {
            return false;
        }
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            valor: this.valor
        };
    }

}