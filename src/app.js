const express = require('express');
const ProductManager = require('./ProductManager');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

const app = express();
const productManager = new ProductManager();

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Rutas de productos
app.use('/api/products', productRoutes);

// Rutas de carritos
app.use('/api/carts', cartRoutes);

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
