const express = require('express');

const stripeController = require('./stripeController');

const router = express.Router();


router.post('/createCustomer', stripeController.createCustomer);
 router.get('/getCustomer/:id', stripeController.getCustomer);
router.post('/createCharge', stripeController.createCharge);
router.post('/customers/addCard', stripeController.addCard);
router.delete('/customers/sources', stripeController.deleteCard);
router.get('/customers/:id/sources', stripeController.getSources);
router.post('/customers/createPayment', stripeController.createPayment); 

module.exports = router;