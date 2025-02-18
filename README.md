# Teddy Monorepo

Este é o repositório monorepo para o projeto Teddy para um processo seletivo na Teddy Open Finance, que contém tanto o backend quanto o frontend. Aqui irei demonstrar o passo a passo para configurar e rodar o projeto em ambientes de desenvolvimento e produção.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker e Docker Compose

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/teddy_page.git

cd teddy_page
```

## Configuração

Para configurar as variáveis de ambiente de cada projeto, acesse os respectivos READMEs:

- [Frontend](frontend/README.md)
- [Backend](backend/README.md)

## Rodando o Projeto

### Ambiente de Desenvolvimento

#### Sem Docker:

```bash
npm run start:dev
```

#### Com Docker:

```bash
npm run docker:start:dev
```

### Ambiente de Produção

#### Sem Docker:

```bash
npm run start:prod
```

#### Com Docker:

```bash
npm run docker:start:prod
```

## Scripts Disponíveis

- `start:dev`: Inicia o backend e o frontend em modo de desenvolvimento.
- `start:prod`: Inicia o backend e o frontend em modo de produção.
- `docker:db`: Inicia o banco de dados usando Docker.
- `docker:start:dev`: Inicia o banco de dados, backend e frontend em modo de desenvolvimento usando Docker.
- `docker:start:prod`: Inicia o banco de dados, backend e o frontend em modo de produção usando Docker.
- `dev:backend`: Inicia o backend em modo de desenvolvimento.
- `dev:frontend`: Inicia o frontend em modo de desenvolvimento.
- `prod:backend`: Inicia o backend em modo de produção.
- `prod:frontend`: Constrói e serve o frontend em modo de produção.

