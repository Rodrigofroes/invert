import swaggerAutogen from "swagger-autogen";
import MatriculaModel from "./models/matriculaModel.js";
import CursoModel from "./models/cursoModel.js";

const doc = {
    info: {
        title: "API - Matrículas",
        description: "Esta API permite a gestão de matrículas de alunos, geração automática de mensalidades, além da criação de RA (Registro Acadêmico) e senhas. Ela também fornece rotas públicas para listar cursos e criar novas matrículas, além de rotas privadas para autenticação e consulta de mensalidades.",
        version: "1.0.0"
    },
    host: 'localhost:5000',
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            matriculaModel: new MatriculaModel(0, "Fulano", "Fulano@teste.com", "19160000", "Rua teste", "Bairro teste", "Cidade teste", "SP", new CursoModel(1, "Análise e Desenvolvimento de Sistemas", 0)).toJSON(),
        },
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputJson, routes, doc)
    .then(async () => {
        await import('./server.js');
    })