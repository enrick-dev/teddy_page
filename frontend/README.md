# Frontend do Projeto Teddy

Este é o frontend do projeto Teddy, construído com React e Vite, aqui um passo a passo caso queira rodar somente o frontend.
OBS: Caso estejá rodando o Monorepo execute somente a etapa de Variáveis de Ambiente

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker (opcional)

## Instalação

1. Navegue até o diretório `frontend`:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

## Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.

```env
# URL do backend
VITE_API_HOST=http://localhost:3000
```

## Rodando o Frontend

### Ambiente de Desenvolvimento

Para rodar o frontend em ambiente de desenvolvimento:

```bash
npm run dev
```
### Usando Docker

Para rodar o backend usando Docker:

```bash
docker compose -f docker-compose.dev.yaml #Para ambiente de desenvolvimento
docker compose -f docker-compose.prod.yaml #Para ambiente de produção
```

## Scripts Disponíveis

- `docker:dev`: Inicia o frontend em modo de desenvolvimento usando Docker.
- `docker:prod`: Inicia o frontend em modo de produção usando Docker.
- `dev`: Inicia o frontend em modo de desenvolvimento.
- `prod`: Inicia o frontend em modo de produção.
- `build`: Constrói o backend.
- `serve`: Serve o frontend construído ("roda" a build).


