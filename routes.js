const express =  require('express');

const router = express.Router();
const stripeHelper = require('./stripeHelper');

router.post('/createCustomer',stripeHelper.createCustomer);
router.post('/createCharge',stripeHelper.createCharge);
router.post('/addCard',stripeHelper.addCard);

module.exports = router;