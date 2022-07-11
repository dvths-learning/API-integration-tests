# Estudo de Teste de Integração

Este é um estudo sobre testes de integração. Os testes são realizados sobre uma API CRUD básica construída em TypesScript e NodeJs, orientada a objetos e estruturada no padrão MSC com um ORM para interface com banco de dados relacional MySQL. 

## Tecnologias:

- POO;
- MySQL;
- TypeScript;
- NodeJs;
- Prisma ORM;
- Express
- Mocha;
- Chai;
- Sinon;
- Joi;


## Como iniciar o programa

- Clone o repositório
- Instale as dependências
- Inicie um container docker de MySQL (recomendado)

```
docker container run -d -e MYSQL_ROOT_PASSORD=password -p 3336:3306 mysql:latest
```

> Obs: O arquivo .env está incluso com a definição da variável de ambiente. 

- Rode os testes com `npm test`
