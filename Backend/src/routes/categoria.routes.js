import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller.js";

const CategoriaRouter = Router();

CategoriaRouter.get('/', CategoriaController.getAll);
CategoriaRouter.post('/', CategoriaController.create);
CategoriaRouter.get('/:id', CategoriaController.getById);
CategoriaRouter.delete('/:id', CategoriaController.delete);
CategoriaRouter.put('/:id', CategoriaController.update);


export default CategoriaRouter;