import { Router } from "express";
import { CursoController } from "../controllers/curso.controller.js";

const cursoRouter = Router();

cursoRouter.get('/', CursoController.getAll);
cursoRouter.post('/', CursoController.create);
cursoRouter.post('/name', CursoController.getByName);
cursoRouter.get('/:id', CursoController.getById);
cursoRouter.delete('/:id', CursoController.delete);
cursoRouter.put('/:id', CursoController.update);


export default cursoRouter;