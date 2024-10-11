# API de Matrículas e Mensalidades de Alunos

Esta API permite a gestão de matrículas de alunos, geração automática de mensalidades, além da criação de RA (Registro Acadêmico) e senhas. Ela também fornece rotas públicas para listar cursos e criar novas matrículas, além de rotas privadas para autenticação e consulta de mensalidades.

## Funcionalidades
- Listagem de cursos (rota pública)
- Criação de matrícula (rota pública)
- Geração de RA e senha para novos alunos
- Autenticação via JWT (JSON Web Token)
- Consulta de mensalidades do aluno logado (rota privada)

## Tecnologias Utilizadas
- **JavaScript**
- **Express.js**
- **JWT para autenticação**

## Como Utilizar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (exemplo no `.env`):
   ```bash
   DB_HOST= 
   DB_DATABASE= 
   DB_USER= 
   DB_PASSWORD= 
   ```

4. Inicie a aplicação:
   ```bash
   npm start
   ```

5. Acesse as rotas públicas e privadas conforme necessário.

## Rotas Disponíveis
- **GET /cursos**: Lista todos os cursos disponíveis (rota pública).
- **POST /matricula**: Cria uma nova matrícula para um aluno (rota pública).
- **POST /auth**: Autentica um usuário e retorna um token JWT.
- **GET /mensalidade**: Consulta a mensalidade do aluno logado (rota privada, JWT necessário).

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir um *pull request* ou *issue*.

---

Com essa descrição, você fornece uma visão geral clara das funcionalidades e tecnologias da API, além de instruções de uso.
