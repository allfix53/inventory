import express from 'express';
import db from './../datasource';

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

  return router;
};
