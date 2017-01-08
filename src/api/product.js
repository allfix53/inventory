import Router from 'express';
import db from './../datasource';

export default () => {
  const router = Router();
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
    })
  });

  return router;
};
