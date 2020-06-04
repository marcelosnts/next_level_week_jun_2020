import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);

/*

// Typescript exige que a biblioteca seja chamada junto a sua definição de tipo (tipagem forte)
// No caso do express o arquivo de tipagem pode ser "chamado" através do comando npm install @types/express -D 
// (-D informa ao projeto que esta dependencia será utilizada apenas no desenvolvimento)

// Dependencia ts-node irá interpretar o typescript e torna-lo legivel para o node

// Rota: Endereço completo da requisição (http://localhost:3333/users/)
// Recurso: Entidade do sistema sendo acessada (/users)

// Request Params: Parametros obrigatorios da rota
// Query Params: Parametros opcionais da rota
// Request Body: Parametros armazenados no corpo da requisição


const users = [
        "Marcelo", 
        "Ferreira",
        "Santos",
        "ts-node-dev"
    ];

app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;

    const user = {
        name: data.name, 
        email: data.email
    };

    return response.json(user);
});
*/