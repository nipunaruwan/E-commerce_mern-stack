const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the product.' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the product.' });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the product.' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the product.' });
  }
});

module.exports = router;
