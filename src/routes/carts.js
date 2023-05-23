const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager');

const cartManager = new CartManager('./data/carrito.json');

// POST /api/carts
router.post('/', async (req, res) => {
  try {
    const cart = req.body;
    const newCart = await cartManager.createCart(cart);

    if (newCart) {
      res.status(201).json(newCart);
    } else {
      res.status(400).json({ error: 'Failed to create cart' });
    }
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCart(cartId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);

    const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Cart or product not found' });
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
