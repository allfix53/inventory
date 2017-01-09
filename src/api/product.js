import express from 'express';
import db from './../datasource';
import promise from 'bluebird';

import debug from 'debug';

const error = debug('app:error');
const log = debug('app:log');

export default () => {
  const router = express();
  // GET / = get list all product
  router.get('/', (req, res) => {
    db.Product.find({}, (err, products) => {
      if (err) {
        res.status(500);
        res.end();
      } else {
        res.status(200);
        res.json(products);
      }
    });
  });

  // GET /:id get product by id
  router.get('/:id', (req, res) => {
    db.Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.status(500);
        res.end();
      } else {
        res.status(200);
        res.json(product);
      }
    });
  });

  // POST /decrease
  router.post('/decrease', (req, res) => {
    let items = [];
    req.body.forEach((item, count) => {
      const actionUpdate = db.Product.findById(item.productId, (err, product) => {
        if (err) {
          res.status(500);
          res.json('invalid input data')
        }
        if (product == null) {
          res.status(500);
          res.json(item.productId + 'not found');
        } else {
          product.qty = product.qty - item.qty;
        product.save();
        }
      });
      items.push()
    });

    promise.all(items)
      .then(() => {
        res.status(200);
        res.json('succeed')
      })
  });

  return router;
};
