import express from 'express';
import db from './../datasource';

export default () => {
  const router = express();

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
    });
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
    });
  });

  // GET /validate/:code validation coupon code
  router.get('/validate/:code', (req, res) => {
    db.Coupon.findOne({code: req.params.code}, (err, coupon) => {
      if (err) {
        res.status(500);
        res.end();
      } 
      if (coupon == null) {
        res.status(200);
        res.json({ valid: false, message: "invalid coupon code" });
      } else {
        // is valid code? is expired? is available limit?
        if (coupon.limit < 1){
          res.status(200);
          res.json({ valid: false, message: "coupon has exceeds the limit" });
        } else if (new Date() <= new Date(coupon.validfrom) || new Date() >= new Date(coupon.validto)){
          res.status(200);
          res.json({ valid: false, message: "coupon has expired" });
        } else {
          res.status(200);
          res.json({ valid: true, value: coupon.value, message: "coupon valid" });
        }
      }
    });
  });

  return router;
};
