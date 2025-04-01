import express from 'express';
import path from 'path';

const app = express();

//middleware
app.use(express.static(path.join(process.cwd(), 'frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta
app.post('/sumarmatrices', (req, res) => {
    try {
        const { filas, columnas, matriz1, matriz2 } = req.body;
    
        if (!Array.isArray(matriz1) || !Array.isArray(matriz2)) {
            return res.status(400).send('Las matrices deben ser arreglos');
        }

        if (matriz1.length !== filas || matriz2.length !== filas) {
            return res.status(400).send('Las matrices no tienen el número de filas correcto');
        }

        if (matriz1[0].length !== columnas || matriz2[0].length !== columnas) {
            return res.status(400).send('Las matrices no tienen el número de columnas correcto');
        }

        //suma
        const resultado = matriz1.map((fila, i) => {
            return fila.map((valor, j) => {
                return valor + matriz2[i][j];
            });
        });

        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
});

//ruta
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend', 'main.html'));
});

//servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
