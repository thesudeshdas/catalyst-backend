var express = require('express');
var router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  res.send({ test: 'suceess' });
});

module.exports = router;
