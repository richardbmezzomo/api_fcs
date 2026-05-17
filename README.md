# FCS — Financial Control System API

API REST para controle financeiro pessoal. Construída com Node.js, Express e PostgreSQL.

## Rodando com Docker (recomendado)

### Pré-requisito

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone o repositório

```bash
git clone https://github.com/ZBMF-Labs/FCS_backend.git
cd FCS_backend
```

### 2. Configure o ambiente

```bash
cp .env.exemple .env
```

Edite o `.env` e preencha as variáveis de e-mail e JWT:

```env
JWT_SECRET=uma_chave_secreta_forte
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
```

> As configurações de banco de dados já vêm com valores padrão para desenvolvimento.

### 3. Suba tudo

```bash
docker compose up --build
```

O Docker vai subir o PostgreSQL e a API automaticamente. A API ficará disponível em `http://localhost:8080`.

### Comandos úteis

```bash
docker compose up --build   # primeira vez ou após instalar dependências
docker compose up           # subidas seguintes
docker compose down         # parar tudo
docker compose logs -f api  # ver logs em tempo real
```

> O código é montado como volume — alterações nos arquivos refletem automaticamente sem reiniciar o container.

---

## Rodando localmente (sem Docker)

### Pré-requisitos

- Node.js 20+
- PostgreSQL 16+

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o banco de dados

```bash
psql postgres -c "CREATE USER fcs_user WITH PASSWORD 'fcs_password';"
psql postgres -c "CREATE DATABASE fcs_db OWNER fcs_user;"
```

### 3. Configure o `.env`

```bash
cp .env.exemple .env
```

### 4. Rode as migrations e inicie

```bash
npx sequelize db:migrate
npm run dev
```

---

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/ZBMF` | Health check |
| POST | `/users` | Criar usuário |
| POST | `/login` | Autenticação |
| GET | `/accounts` | Listar contas |
| POST | `/accounts` | Criar conta |
| GET | `/categories` | Listar categorias |
| POST | `/categories` | Criar categoria |
| GET | `/transactions` | Listar transações |
| POST | `/transactions` | Criar transação |

---

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Banco de dados:** PostgreSQL
- **ORM:** Sequelize
- **Auth:** JWT + Bcrypt
- **E-mail:** Nodemailer
