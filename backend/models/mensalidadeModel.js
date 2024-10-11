import Database from "../db/database.js";

const banco = new Database();

export default class MensalidadeModel {
    #id;
    #mes;
    #vencimento;
    #valor;
    #matricula;

    constructor(id, mes, vencimento, valor, matricula) {
        this.#id = id;
        this.#mes = mes;
        this.#vencimento = vencimento;
        this.#valor = valor;
        this.#matricula = matricula;
    }

    get id() {
        return this.#id;
    }

    get mes() {
        return this.#mes;
    }

    get vencimento() {
        return this.#vencimento;
    }

    get valor() {
        return this.#valor;
    }

    get matricula() {
        return this.#matricula;
    }

    set id(value) {
        this.#id = value;
    }

    set mes(value) {
        this.#mes = value;
    }

    set vencimento(value) {
        this.#vencimento = value;
    }

    set valor(value) {
        this.#valor = value;
    }

    set matricula(value) {
        this.#matricula = value;
    }


    async gerarMatricula(id) {
        let r = false;
        let mesInicio = 7;
        let anoInicio = 2024;

        try {
            let sql = "SELECT * FROM tb_curso WHERE cur_id = ?";
            let consulta = await banco.ExecutaComando(sql, [id]);

            if (!consulta) {
                throw new Error('Curso não encontrado!');
            }

            const valorMensalidade = consulta[0].cur_valor;
            await banco.AbreTransacao();
            for (let i = 0; i < 12; i++) {
                const mesAtual = (mesInicio + i - 1) % 12 + 1;
                const anoAtual = anoInicio + Math.floor((mesInicio + i - 1) / 12);
                const diaAtual = new Date().getDate();
                const vencimento = `${anoAtual}-${String(mesAtual).padStart(2, '0')}-${diaAtual}`;

                sql = "INSERT INTO tb_mensalidade(men_mes, men_vencimento, men_valor, mat_id) VALUES (?, ?, ?, ?)";
                const valores = [mesAtual, vencimento, valorMensalidade, this.#matricula];

                const resultado = await banco.ExecutaComandoNonQuery(sql, valores);

                if (resultado) {
                    r = true;
                } else {
                    await banco.Rollback();
                    throw new Error('Erro ao gerar as mensalidades!');
                }
            }

            await banco.Commit();
            return r;
        } catch (error) {
            throw error;
        }
    }

    async mensalidade(id){
        let sql = `SELECT * 
                    FROM tb_usuarioaluno 
                    INNER JOIN tb_mensalidade ON tb_mensalidade.mat_id = tb_usuarioaluno.mat_id 
                    WHERE tb_usuarioaluno.usa_id = ?
                    ORDER BY tb_mensalidade.men_vencimento ASC;
                   `;
        let valor = [id];

        let consulta = await banco.ExecutaComando(sql, valor);
        return  this.toMAP(consulta);
    }

    toJSON() {
        return {
            id: this.#id,
            mes: this.#mes,
            vencimento: this.#vencimento,
            valor: this.#valor,
            matricula: this.#matricula
        };
    }

    toMAP(rows) {
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let obj = new MensalidadeModel();
            obj.#id = rows[i]['men_id']
            obj.#mes = rows[i]['men_mes'];
            obj.#vencimento = rows[i]['men_vencimento'];
            obj.#valor = rows[i]['men_valor'];
            obj.#matricula = rows[i]['mat_id']
            

            lista.push(obj);
        }

        if (lista.length > 0) {
            return lista;
        } else {
            return false;
        }
    }

}