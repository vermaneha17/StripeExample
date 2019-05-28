const createError = require('http-errors');

const paymentHelper = require('./helpers/payment');

module.exports = {
    createPayment: async function (req, res, next) {
        try {
            const charge = await paymentHelper.createPayment(req.body);
            res.responseHandler(charge)
        } catch (err) {
            //return next(createError('Invalid Customer Id'));
            console.log('Error: ', err);
        }
    }
};