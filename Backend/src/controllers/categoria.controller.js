import { CategoriaModel } from "../models/categoria.js";
import { validateCategoria } from "../schemas/categoria.js";

export class CategoriaController {
    static async getAll(req, res) {
        const categorias = await CategoriaModel.getAll();
        res.json(categorias);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const categoria = await CategoriaModel.getById({ id });
        if (!categoria) {
            res.status(404).json({ message: 'Categoria no encontrada' });
            return;
        }
        res.json(categoria);
    }

    static async create(req, res) {
        const result = validateCategoria(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const categoria = await CategoriaModel.create({ categoria: result.data });
        res.status(201).json(categoria);
    }

    static async delete(req, res) {
        const { id } = req.params;
        await CategoriaModel.delete({ id });
        res.json({ message: 'Categoria eliminada' });
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = validateCategoria(req.body);
        if (result.error) {
            res.status(422).json({ error: JSON.parse(result.error.message) });
            return;
        }
        await CategoriaModel.update({ id, categoria: result.data });
        res.json({ message: 'Categoria actualizada' });
    }

}