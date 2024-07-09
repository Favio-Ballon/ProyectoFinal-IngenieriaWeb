import { cursoModel } from "../models/curso.js";
import { validateCurso, validatePartialCurso } from "../schemas/curso.js";

export class CursoController {
    static async getAll(req, res) {
        const cursos = await cursoModel.getAll();
        res.json(cursos);
    }
    static async getById(req, res) {
        const { id } = req.params;
        const curso = await cursoModel.getById({ id });
        if (!curso) {
            res.status(404).json({ message: 'Curso no encontrado' });
            return;
        }
        res.json(curso);
    }
    static async getByName(req, res) {
        const { titulo } = req.body;
        const curso = await cursoModel.getByName({ titulo });
        if (!curso) {
            res.status(404).json({ message: 'Curso no encontrado' });
            return;
        }
        res.json(curso);
    }

    static async create(req, res) {
        const result = validateCurso(req.body);
        console.log(result)
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const curso = await cursoModel.create({ curso: result.data });
        res.status(201).json(curso);
    }

    static async delete(req, res) {
        const { id } = req.params;
        await cursoModel.delete({ id });
        res.json({ message: 'Curso eliminado' });
    }

    static async update (req, res) {
        const { id } = req.params;
        const result = validatePartialCurso(req.body);
        if (result.error) {
            res.status(422).json({ error: JSON.parse(result.error.message) });
            return;
        }
        await cursoModel.update({ id, curso: result.data });
        res.json({ message: 'Curso actualizado' });
    }

}