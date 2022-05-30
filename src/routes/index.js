const express = require('express');
const { 
  getProducts, 
  createProduct,
  delegateProduct,
  acceptProductDelegation,
  getDelegatedProductsByAddress
} = require('../controllers/index');

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const response = await getProducts();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.post('/product', async (req, res) => {
  try {
    const { name } = req.body;
    const response = await createProduct(name);
    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.put('/delegate-product', async (req, res) => {
  try {
    const { newOwnerAddress, productId } = req.body;
    const response = await delegateProduct(newOwnerAddress, productId);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.put('/accept-product', async (req, res) => {
  try {
    const { productId } = req.body;
    const response = await acceptProductDelegation(productId);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.get('/delegated-products', async (req, res) => {
  try {
    const { address } = req.body;
    const response = await getDelegatedProductsByAddress(address);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;