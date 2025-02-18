# Backend do Projeto Teddy

Este é o backend do projeto Teddy, construído com NestJS, aqui um passo a passo caso queira rodar somente o backend.  
OBS: Caso estejá rodando o Monorepo execute somente a etapa de Variáveis de Ambiente

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker (opcional)

## Instalação

1. Navegue até o diretório `backend`:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

## Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.

```env
# Configuração do banco de dados
POSTGRES_DB=database
POSTGRES_USER=root
POSTGRES_PASSWORD=root123
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_SYNCHRONIZE=true

# Configuração de conta do pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=root

# Configuração do JWT - chave de autenticação
JWT_SECRET_TOKEN=123456
```

## Rodando o Backend

### Ambiente de Desenvolvimento

Para rodar o backend em ambiente de desenvolvimento:

```bash
npm run start:dev
```

### Usando Docker

Para rodar o backend usando Docker:

```bash
docker compose -f docker-compose.dev.yaml #Para ambiente de desenvolvimento
docker compose -f docker-compose.prod.yaml #Para ambiente de produção
```

## Scripts Disponíveis

- `docker:db`: Inicializa apenas o banco de dados no Docker.
- `docker:start:dev`: Inicia o backend em modo de desenvolvimento usando Docker.
- `docker:start:prod`: Inicia o backend em modo de produção usando Docker.
- `start:dev`: Inicia o backend em modo de desenvolvimento.
- `start:prod`: Inicia o backend em modo de produção.
- `build`: Constrói o backend.

