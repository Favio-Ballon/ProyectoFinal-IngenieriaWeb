import { Router } from "express";
import { LeccionController } from "../controllers/leccion.controller.js";

const leccionRouter = Router();

leccionRouter.post('/', LeccionController.create);
leccionRouter.get('/curso/:curso_id', LeccionController.getByCurso);
leccionRouter.get('/:id', LeccionController.getById);
leccionRouter.delete('/:id', LeccionController.delete);
leccionRouter.put('/:id', LeccionController.update);
leccionRouter.put('/down/:id', LeccionController.moveDown);
leccionRouter.put('/up/:id', LeccionController.moveUp);

export default leccionRouter;