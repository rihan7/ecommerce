const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const Order = require('../models/order');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
});


router.post('/checkout', async (req, res, next) => {
  const { items } = req.body;
  let validation = true;
  let totalQty = null;
  let totalPrice = null;
  try {
    await Promise.all(
      Object.keys(items).map(async item => {
        const itemObj = await Product.findById(item).exec();
        let priceCompere = itemObj.price * items[item].qty === items[item].price;
        validation = validation && priceCompere;
        totalQty += items[item].qty;
        totalPrice += itemObj.price * items[item].qty;
      })
    )
    const order = new Order({
      items: req.body.items,
      totalQty,
      totalPrice,
    });
    await order.save();

    res.status(200).json({ message: 'payment successful' });
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
});


module.exports = router;