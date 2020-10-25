import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import PasswordController from './controllers/PasswordController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', (request, response) =>
  OrphanagesController.index(request, response, true)
);
routes.get('/pending', (request, response) =>
  OrphanagesController.index(request, response, false)
);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.put('/orphanages/:id', OrphanagesController.update);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.post('/forgot', PasswordController.create);
routes.post('/reset', PasswordController.update);
routes.post('/login', PasswordController.show);

export default routes;
