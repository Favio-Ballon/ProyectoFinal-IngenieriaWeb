import { vistoModel } from '../models/visto.js';
import { validatePartialVisto, validateVisto } from '../schemas/visto.js';

export class VistoController {
    static async getByLeccionCurso(req, res) {
        const { leccion_id, mis_cursos_id } = req.params;
        console.log("---------- ",leccion_id, mis_cursos_id);
        const vistos = await vistoModel.getByLeccionCurso({ leccion_id, mis_cursos_id });
        res.json(vistos);
    }

    static async create(req, res) {
        const result = validatePartialVisto(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        await vistoModel.create({ leccion_id: result.data.leccion_id, mis_cursos_id: result.data.mis_cursos_id });
        res.status(201).json({ message: 'Visto creado' });
    }

    static async update(req, res) {
        const { leccion_id, mis_cursos_id } = req.params;
        await vistoModel.update({ leccion_id, mis_cursos_id });
        res.json({ message: 'Visto actualizado' });
    }

    static async getLeccionesCompletadas(req, res) {
        const { curso_id, usuario_id } = req.params;
        const lecciones = await vistoModel.getLeccionesCompletadas({ curso_id, usuario_id });
        res.json(lecciones);
    }
}