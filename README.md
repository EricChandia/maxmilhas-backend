# Maxmilhas Blacklist API


##  :clipboard: Descrição
Teste prático de back-end realizado para a Maxmilhas. Desenvolvimento de uma API REST para adicionar dados de CPF em uma lista restrita. 


## :computer:	 Tecnologias e Conceitos

Back-end:
- Node.js com Express, TypeScript

Banco de dados:
- Postgres com Prisma

Devops:
- Docker

Conceitos:
- SOLID, Clean Code, Layered architecture

Organização: 
- Eslint, Prettier

Testes:
- Jest, Supertest


## :rocket: Rotas

  
   ```yml
POST /cpf
    - Cadastra um novo cpf na lista restrita.
    - headers: {}
    - body: { "cpf": "64852893055" }
    - Se sucesso retorna o código 201. Se erro retorna os códigos 400(Bad Request) ou 409(Conflict);
```

   ```yml
GET /cpf/:cpf
    - Procura por um cpf na lista restrita.
    - headers: {}
    - body: {}
    - Se sucesso retorna o código 200 e um objeto com o cpf. Se erro retorna os códigos 400(Bad Request) ou 404(Not Found);
    - Exemplo de sucesso:
      Content: { "cpf": "64852893055", createdAt: "2019-12-17T22:22:08.547Z"}
```

   ```yml
DELETE /cpf/:cpf
    - Remove o cpf na lista restrita.
    - headers: {}
    - body: {}
    - Se sucesso retorna o código 200. Se erro retorna os códigos 400(Bad Request) ou 404(Not Found);
```

   ```yml
GET /cpf
    - Retorna todos os CPFs da lista restrita.
    - headers: {}
    - body: {}
    - Se sucesso retorna o código 200 e um array com todos os cpfs da lista restrita. Se não houver nenhum cpf retorna um array vazio. Se erro retorna o código 400 400(Bad Request).
    - Exemplo de sucesso:
    Content: [ { "cpf": "64852893055", createdAt: "2019-12-17T22:22:08.547Z"} ]
```

## :rocket: Pré requisitos
Antes de começar, você vai precisar ter instalado em seu computador as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/).
Caso quiser editar o código, irá precisar de um bom editor como o [VSCode](https://code.visualstudio.com/)


## 🏁 Rodando a aplicação
Primeiro, faça o clone desse repositório em seu computador:

```
git clone https://github.com/EricChandia/maxmilhas-backend/
```

Entrar na pasta raiz do projeto.


Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm i
```

Finalizado o processo, a forma mais fácil de inicializar o projeto é com o Docker, para isso, rode o seguinte comando:
```
npm run start:docker
```

Desta forma a aplicação rodará na porta 4000. O banco de dados será montado automáticamente com as migrations e estará rodando na porta 5433.


## 🔭 Testes
Esse projeto possui testes unitários e de integração, para rodar ambos a forma mais fácil também é com o Docker. Para isso, rode o seguinte comando na pasta raiz do projeto:
```
npm run test:docker
```

## 💬 Ambiente de desenvolvimento
Se você deseja alterar ou desenvolver neste projeto, poderá utilizar o ambiente de desenvolvimento. Para isso, crie dentro da pasta raiz do projeto um arquivo .env.development, seguindo o exemplo do arquivo .env.example. Assim você pode rodar o projeto com o seguinte comando:
```
npm run dev
```
