import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import PointsController from './Controllers/PointsController';
import ItemsController from './Controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/', (request, response) => {
    return response.json({message : "Hello world!"})
});

routes.get('/items', itemsController.index);

routes.post('/points', 
    upload.single('image'), 
    celebrate({
        body : Joi.object().keys({
            name : Joi.string().required(),
            email : Joi.string().required(),
            whatsapp : Joi.string().required(),
            latitude : Joi.number().required(),
            longitude : Joi.number().required(),
            city : Joi.string().required(),
            uf : Joi.string().required().max(2),
            items : Joi.string().required(),
        })
    }, {
        abortEarly : false,
    }),
    pointsController.create
);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;