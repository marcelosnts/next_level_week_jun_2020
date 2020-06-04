import express from 'express';
import PointsController from './Controllers/PointsController';
import ItemsController from './Controllers/ItemsController';

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/', (request, response) => {
    return response.json({message : "Hello world!"})
});

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;