# Projeto Invert

Esse projeto é uma aplicação para a gestão de matrículas de alunos, geração automática de mensalidades, criação de RA (Registro Acadêmico) e senhas. Inclui um sistema de autenticação e rotas públicas e privadas para atender as diversas necessidades dos usuários.

## Funcionalidades

- **Listagem de cursos**: Permite listar os cursos disponíveis (rota pública).
- **Criação de matrícula**: Permite cadastrar novas matrículas de alunos (rota pública).
- **Geração de RA e senha**: RA e senha são gerados automaticamente para novos alunos.
- **Autenticação via JWT**: Autenticação segura usando JSON Web Token (JWT).
- **Consulta de mensalidades**: Disponível para alunos logados (rota privada).
- **Busca de CEP**: Realiza a consulta de CEP para preenchimento de endereços.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, Bootstrap, JavaScript, Express.js
- **Backend**: JavaScript, Express.js, MySQL e Stripe para gerenciamento de pagamentos
- **Autenticação**: JWT para autenticação de usuários

## Pré-requisitos

- Node.js v14 ou superior
- Banco de dados configurado (conforme variáveis de ambiente)
- Conta no Stripe para integração de pagamentos

## Configuração do Ambiente

### Variáveis de Ambiente

Configure as variáveis de ambiente no `.env`:

**Frontend**:
```
HOST_API= // URL da API Backend
```

**Backend**:
```
DB_HOST= // Endereço do banco de dados
DB_DATABASE= // Nome do banco de dados
DB_USER= // Usuário do banco de dados
DB_PASSWORD= // Senha do banco de dados
STRIPE_SECRET_KEY= // Chave secreta do Stripe
```

A chave pública do Stripe deve ser adicionada no arquivo JavaScript localizado em `client/js/curso/matricula.js`.

## Como Utilizar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Rodrigofroes/invert.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente conforme o exemplo no `.env`.

4. Inicie a aplicação:
   ```bash
   npm start
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um *pull request* ou *issue*.
