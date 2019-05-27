const express = require('express');

const router = express.Router();
const stripeHelper = require('./stripeHelper');

router.get('/', (req, res, next) => {
    res.json({ message: `Welcome to Stripe` });
});
router.post('/createCustomer', stripeHelper.createCustomer);
router.get('/getCustomer/:id', stripeHelper.getCustomer);
router.post('/createCharge', stripeHelper.createCharge);
router.post('/customers/:id/addCard', stripeHelper.addCard);
router.delete('/customers/:id/sources', stripeHelper.deleteCard);
router.get('/customers/:id/sources', stripeHelper.getSources);

module.exports = router;