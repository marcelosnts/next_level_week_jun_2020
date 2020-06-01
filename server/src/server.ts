import express from 'express';

// Typescript exige que a biblioteca seja chamada junto a sua definição de tipo (tipagem forte)
// No caso do express o arquivo de tipagem pode ser "chamado" através do comando npm install @types/express -D 
// (-D informa ao projeto que esta dependencia será utilizada apenas no desenvolvimento)

// Dependencia ts-node irá interpretar o typescript e torna-lo legivel para o node

const app = express();

app.get('/users', (request, response) => {
    console.log("Rota users");

    response.json([
        "Marcelo", 
        "Ferreira",
        "Santos",
        "ts-node-dev"
    ]);
});

app.listen(3333);