import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/user.js";

export class UserController {
    static async getAll(req, res) {
        const users = await UserModel.getAll();
        res.json(users);
    }

    static async create(req, res) {
        const result = validateUser(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const user = await UserModel.create({ user: result.data });
        res.status(201).json(user);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const user = await UserModel.getById({ id });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }

    static async delete(req, res) {
        const { id } = req.params;
        await UserModel.delete({ id });
        res.json({ message: 'Usuario eliminado' });
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = validateUser(req.body);
        if (result.error) {
            res.status(422).json({ error: JSON.parse(result.error.message) });
            return;
        }
        await UserModel.update({ id, user: result.data });
        res.json({ message: 'Usuario actualizado' });
    }

    static async login(req, res) {
        const { username, password } = req.body;
        const user = await UserModel.login({ username, password });
        if (!user) {
            //contraseña incorrecta
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }
        res.json(user);
    }

    static async getByName(req, res) {
        const { username } = req.params;
        const user = await UserModel.getByName({ username });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }

    static async getByEmail(req, res) {
        const { email } = req.params;
        const user = await UserModel.getByEmail({ email });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }

}