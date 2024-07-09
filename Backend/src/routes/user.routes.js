import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.get('/', UserController.getAll);
usersRouter.post('/', UserController.create);
usersRouter.get('/:id', UserController.getById);
usersRouter.delete('/:id', UserController.delete);
usersRouter.put('/:id', UserController.update);
usersRouter.post('/login', UserController.login);
usersRouter.get('/username/:username', UserController.getByName);
usersRouter.get('/email/:email', UserController.getByEmail);


export default usersRouter;