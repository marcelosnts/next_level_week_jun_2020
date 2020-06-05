import {Request, Response, text} from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request : Request, response : Response){
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }
    async show (request : Request, response : Response){
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({message : "Ponto de coleta não encontrado!"});
        }else {
            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.title');

            return response.json({point, items});
        }
    }

    async create(request : Request, response : Response){
        // Destructuring assignment JS
        // Ao informar os campos que serão buscados diretamente no corpo do objeto ja é criado uma variavel e iniciado com seu respectivo valor
        // const name = request.body.name << Criação de variável comum
        const {
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf, 
            items
        } = request.body;
        
        // Transaction no knex pode ser utilizada instanciando o método em uma variavel através do código knex.transaction(),
        // após isso deve-se apenas substituir na execução das querys o termo knex pela variavel criada
        // trx = termo utilizado para Transaction 
        const trx = await knex.transaction();
        // Short syntax 
        // Na criação de um objeto se a propriedade e seu valor tem os mesmos nomes pode inserir apenas um valor, nao necessitando inserir propriedade : valor
        const point = {
            image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf
        };

        const insertedIds = await trx('points').insert(point);
        
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id : number) => {
            return {
                item_id,
                point_id
            }
        });
        
        await trx('point_items').insert(pointItems);
        
        await trx.commit();

        if (trx.isCompleted()) { 
            return response.json({
                id : point_id,
                ... point
            });
        } else {
            return response.json({ message : "Ocorreu um erro durante a transação" });
        }
    };
};

export default PointsController;