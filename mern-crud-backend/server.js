import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import taskRoutes from './routes/taskRoutes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors());
// Configuración de middlewares
app.use(express.json()); // Parseo de JSON
app.use(cookieParser()); // Uso de cookies
app.use(cors(corsOptions)); // Configuración CORS

// Conexión a la base de datos
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed:', err);
    }
};
 

// Rutas
app.use('/tasks', taskRoutes);


// Middleware de manejo de errores
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    connect();
    console.log('server listening on port', port);
});
