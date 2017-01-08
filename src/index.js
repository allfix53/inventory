import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import debug from 'debug';
import api from './api';
import product from './api/product'

import db from './datasource';

import productList from './product.json';
import couponList from './coupon.json';

const error = debug('app:error');
const log = debug('app:log');

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (typeof req.headers.secretkey != 'string' && req.headers.secretkey != 'x-om-telolet-om') {
    res.status(401)
    res.json({
      message: "Not allowed access"
    })
  } else {
    next()
  }
})

// Add souting API endpoint
app.use('/', api());
app.use('/products', product())

app.server.listen(process.env.PORT || 8080);
log(`Started on port ${app.server.address().port}`);

// Re-create force Coupons
db.Coupon.remove({}, (err, result) => {
  if (err) error(err)
  else {
    db.Coupon.create(couponList, (err, result) => {
      if(err) error(err)
      else log('couponList created')
    })
  }
})

// Re-create force Products
db.Product.remove({}, (err, result) => {
  if (err) error(err)
  else {
    db.Product.create(productList, (err, result) => {
      if (err) error(err)
      else log('productList created')
    })
  }
})

export default app;
