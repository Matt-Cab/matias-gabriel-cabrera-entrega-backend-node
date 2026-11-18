import express from 'express';
import cors from 'cors';

import productsRoutes from './src/routes/products.routes.js';
import authRoute from './src/routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Datos recibidos: ${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoute);

app.use('/api', productsRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Error 404, ruta no encontrada.',
    message: `El recurso ${req.url} no existe.`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
