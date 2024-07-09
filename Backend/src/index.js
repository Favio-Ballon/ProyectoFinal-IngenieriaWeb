import express, { json } from 'express';
import userRoutes from './routes/user.routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import cursoRouter from './routes/curso.routes.js';
import categoriaRouter from './routes/categoria.routes.js'
import leccionRouter from './routes/leccion.routes.js';
import misCursosRouter from './routes/misCursos.routes.js';
import vistosRouter from './routes/visto.routes.js';
import cursoHasCategoriaRouter from './routes/cursoHasCategoria.routes.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(json());
app.disable('x-powered-by');
app.use(corsMiddleware())

// Routes
app.use('/usuarios', userRoutes);
app.use('/cursos', cursoRouter);
app.use('/categorias', categoriaRouter);
app.use('/lecciones', leccionRouter);
app.use('/miscursos', misCursosRouter);
app.use('/vistos', vistosRouter);
app.use('/cursoHasCategoria', cursoHasCategoriaRouter);

app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));

app.post
    ('/upload', upload.single('image'), (req, res) => {

        if (!req.file) {
            res.status(400).json("No file uploaded.");
            return;
        }

        res.status(200).json(req.file.filename);
    });


app.get('/', (req, res) => {
    res.json({ "message": 'Hola mundo' })
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

