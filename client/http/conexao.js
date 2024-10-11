import 'dotenv/config';
export default class Conexao {
    #url;

    constructor() {
        this.#url = process.env.HOST_API;
    }

    get url() {
        return this.#url;
    }

    async cursos() {
        let response = await fetch(this.#url + "/curso");
        let dados = await response.json();
        return dados;
    }

    async curso(id) {
        let response = await fetch(this.#url + "/curso/" + id);
        let dados = await response.json();
        return dados;
    }

    async cep(cep) {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        let response = await fetch(url);
        let dados = await response.json();

        if (!dados.erro) {
            return dados;
        }

        return false;
    }

    async matricula(id, nome, email, cep, endereco, bairro, cidade, estado) {
        let url = this.#url + "/matricula/";
        let objeto = {
            nome,
            email,
            cep,
            endereco,
            bairro,
            cidade,
            estado,
            curso: {
                id
            }
        };

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto)
        });

        let dados = await response.json();
        return dados;
    }

    async login(ra, senha) {
        let url = this.#url + "/auth";
        let objeto = { ra, senha };
    
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto)
        });
        
        let dados = await response.json();

        if(!dados.token){
            return false;
        }
        return dados;
    }
    

    async mensalidade(token){
        let url = this.#url + "/mensalidade";
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        let dados = await response.json();

        if(dados.erro){
            return false;
        }

        return dados;
    }

}
