import { misCursosModel } from "../models/misCursos.js";
import { validateMisCursos } from "../schemas/misCursos.js";

export class misCursosController {
    static async getByUsuario(req, res) {
        const { usuario_id } = req.params;
        const cursos = await misCursosModel.getByUsuario({ usuario_id });
        res.json(cursos);
    }

    static async getByCurso(req, res) {
        const { curso_id, usuario_id } = req.params;
        const usuarios = await misCursosModel.getByCurso({ curso_id, usuario_id });
        res.json(usuarios);
    }

    static async getIdByCursoUsuario(req, res) {
        const { curso_id, usuario_id } = req.params;
        const id = await misCursosModel.getIdByCursoUsuario({ curso_id, usuario_id });
        res.json(id);
    }

    static async create(req, res) {
        const result = validateMisCursos(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const { usuario_id, curso_id } = result.data;
        await misCursosModel.create({ usuario_id, curso_id });
        res.status(201).json({ message: 'Curso agregado' });
    }

    static async delete(req, res) {
        const { usuario_id, curso_id } = req.params;
        await misCursosModel.delete({ usuario_id, curso_id });
        res.json({ message: 'Curso eliminado' });
    }
}