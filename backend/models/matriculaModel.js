import Database from "../db/database.js";

const banco = new Database();

export default class MatriculaModel{
    #id;
    #nome; 
    #email;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #estado;
    #curso;

    constructor(id, nome, email, cep, endereco, bairro, cidade, estado, curso) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#curso = curso;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get email() {
        return this.#email;
    }

    get cep() {
        return this.#cep;
    }

    get endereco() {
        return this.#endereco;
    }

    get bairro() {
        return this.#bairro;
    }

    get cidade() {
        return this.#cidade;
    }

    get estado() {
        return this.#estado;
    }

    get curso() {
        return this.#curso;
    }

    set id(value) {
        this.#id = value;
    }

    set nome(value) {
        this.#nome = value;
    }

    set email(value) {
        this.#email = value;
    }

    set cep(value) {
        this.#cep = value;
    }

    set endereco(value) {
        this.#endereco = value;
    }

    set bairro(value) {
        this.#bairro = value;
    }

    set cidade(value) {
        this.#cidade = value;
    }

    set estado(value) {
        this.#estado = value;
    }

    set curso(value) {
        this.#curso = value;
    }


    async matricula(){
        let sql = "INSERT INTO tb_matricula(mat_nome, mat_data, mat_email, mat_cep, mat_endereco, mat_bairro, mat_cidade, mat_uf, mat_cursando, cur_id) VALUES (?, now(), ?, ?, ?, ?, ?, ?, 'S', ?)";
        let valores = [this.#nome, this.#email, this.#cep, this.#endereco, this.#bairro, this.#cidade, this.#estado, this.#curso.id ];
        
        let resultado = await banco.ExecutaComandoLastInserted(sql, valores);

        return resultado;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            cep: this.#cep,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            estado: this.#estado,
            curso: this.#curso.toJSON()
        };
    }

}