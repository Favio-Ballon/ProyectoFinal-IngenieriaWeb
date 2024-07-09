import { leccionModel } from "../models/leccion.js";
import { validateLeccion, validatePartialLeccion } from "../schemas/leccion.js";

export class LeccionController{
    static async getByCurso(req, res) {
        const { curso_id } = req.params
        console.log(req.params);
        const lecciones = await leccionModel.getByCurso({ curso_id });
        res.json(lecciones);
    }

    static async getById(req, res) {
        const{ id } = req.params;
        const leccion = await leccionModel.getById({ id });
        res.json(leccion);
    }

    static async create(req, res) {
        console.log("Leccion: ", req.body);
        const result = validateLeccion(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const leccion = await leccionModel.create({ leccion: result.data });
        res.status(201).json(leccion);
    }

    static async update(req, res) {
        const { id } = req.params;
        console.log(req.body);
        const result = validatePartialLeccion(req.body);
        if (result.error) {
            res.status(422).json({ error: JSON.parse(result.error.message) });
            return;
        }
        await leccionModel.update({ id, leccion: result.data });
        res.json({ message: 'Leccion actualizada' });
    }

    static async delete(req, res) {
        const { id } = req.params;
        await leccionModel.delete({ id });
        res.json({ message: 'Leccion eliminada' });
    }

    static async moveDown(req, res){
        const { id } = req.params;
        await leccionModel.moveDown({ id });
        res.json({ message: 'Leccion movida' });
    }

    static async moveUp(req, res){
        const { id } = req.params;
        await leccionModel.moveUp({ id });
        res.json({ message: 'Leccion movida' });
    }
}