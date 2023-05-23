const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('./data/productos.json');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);

    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ error: 'Failed to add product' });
    }
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = { ...req.body, id: productId };
    const product = await productManager.updateProduct(updatedProduct);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const result = await productManager.deleteProduct(productId);

    if (result) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
