const mongoose = require('mongoose'),
   Schema = mongoose.Schema;

const schema = new Schema({
   items: { type: Object, required: true },
   totalQty: { type: Number, required: true },
   totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Order', schema);