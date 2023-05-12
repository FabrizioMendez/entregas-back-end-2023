const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager();

// Endpoint para obtener productos
app.get('/products', async (req, res) => {
  try {
    // Obtener el valor del parámetro de límite
    const limit = req.query.limit; 
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000');
});
