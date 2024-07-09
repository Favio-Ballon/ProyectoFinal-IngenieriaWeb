import { Router } from "express";
import { CursoHasCategoriaController } from "../controllers/cursoHasCategoria.controller.js";

const cursoHasCategoriaRouter = Router();

cursoHasCategoriaRouter.post('/', CursoHasCategoriaController.create);
cursoHasCategoriaRouter.delete('/curso/:curso_id', CursoHasCategoriaController.deleteAll);
cursoHasCategoriaRouter.get('/categoria/:curso_id', CursoHasCategoriaController.getCategoriaByCurso);
cursoHasCategoriaRouter.get('/curso/:categoria_id', CursoHasCategoriaController.getCursoByCategoria);

export default cursoHasCategoriaRouter;

