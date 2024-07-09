import { cursoHasCategoriaModel } from "../models/cursoHasCategoria.js";
import { validateCursoHasCategoria } from "../schemas/cursoHasCategoria.js";

export class CursoHasCategoriaController {

    static async create(req, res) {
        const result = validateCursoHasCategoria(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const cursoHasCategoria = await cursoHasCategoriaModel.create({ cursoHasCategoria: result.data });
        res.status(201).json(cursoHasCategoria);
    }

    static async deleteAll(req, res) {
        const { curso_id } = req.params;
        await cursoHasCategoriaModel.deleteAll({ curso_id });
        res.json({ message: 'Categorias eliminadas' });
    }

    static async getCategoriaByCurso(req, res) {
        const { curso_id } = req.params;
        const categorias = await cursoHasCategoriaModel.getCategoriaByCurso({ curso_id });
        res.json(categorias);
    }

    static async getCursoByCategoria(req, res) {
        const { categoria_id } = req.params;
        const cursos = await cursoHasCategoriaModel.getCursoByCategoria({ categoria_id });
        res.json(cursos);
    }
    

}