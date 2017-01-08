import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/ss-order');

const coupon = {
  code: String,
  validfrom: Date,
  validto: Date,
  value: String,
  limit: Number,
};

const product = {
  name: String,
  price: Number,
  qty: Number,
};

const Coupon = mongoose.model('Coupon', coupon);
const Product = mongoose.model('Product', product);

export default { Coupon, Product };