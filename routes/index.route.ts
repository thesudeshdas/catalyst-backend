const express = require('express');
const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  res.send({ test: 'suceess' });
});

module.exports = router;

export {};
