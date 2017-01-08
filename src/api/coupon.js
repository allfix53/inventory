import Router from 'express';
import db from './../datasource';

export default () => {
  const router = Router();

  // GET / = get list all coupons
  router.get('/', (req, res) => {
    db.Coupon.find({}, (err, coupons) => {
      if (err) {
        res.status(500);
        res.end();
      } else {
        res.status(200);
        res.json(coupons);
      }
    })
  });

  // GET / = get coupon by id
  router.get('/:id', (req, res) => {
    db.Coupon.findById(req.params.id, (err, coupon) => {
      if (err) {
        res.status(500);
        res.end();
      } else {
        res.status(200);
        res.json(coupon);
      }
    })
  });

  return router;
};
