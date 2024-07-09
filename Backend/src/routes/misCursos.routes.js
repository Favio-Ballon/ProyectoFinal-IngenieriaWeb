import { Router } from "express";
import { misCursosController } from "../controllers/misCursos.controller.js";

const misCursosRouter = Router();

misCursosRouter.get('/usuario/:usuario_id', misCursosController.getByUsuario);
misCursosRouter.post('/', misCursosController.create);
misCursosRouter.delete('/:usuario_id/:curso_id', misCursosController.delete);
misCursosRouter.get('/curso/:curso_id/usuario/:usuario_id', misCursosController.getByCurso);
misCursosRouter.get('/curso/:curso_id/usuario/:usuario_id/id', misCursosController.getIdByCursoUsuario);

export default misCursosRouter;