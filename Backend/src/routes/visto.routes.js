import { Router } from "express";
import { VistoController } from "../controllers/visto.controller.js";

const vistosRouter = Router();

vistosRouter.get('/leccion/:leccion_id/curso/:mis_cursos_id', VistoController.getByLeccionCurso);
vistosRouter.post('/', VistoController.create);
vistosRouter.put('/leccion/:leccion_id/curso/:mis_cursos_id', VistoController.update);
vistosRouter.get('/curso/:curso_id/usuario/:usuario_id', VistoController.getLeccionesCompletadas);

export default vistosRouter;
