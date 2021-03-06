const createError = require('http-errors');

const stripeHelper = require('./helpers/stripe');

module.exports = {
    createCustomer: async function (req, res, next) {
        try {
            const customer = await stripeHelper.createCustomer(req.body.email, req.body.token);
            res.responseHandler({ customer: customer });
        } catch (err) {
            //return next(createError('invalid token'));
            console.log('Error: ', err);
        }
    },

    getCustomer: async function (req, res, next) {
        try {
            const customer = await stripeHelper.getCustomer(req.params.id);
            res.responseHandler(customer);
        } catch (err) {
            //return next(createError('Invalid Customer Id'));
            console.log('Error: ', err);
        }
    },

    createCharge: async function (req, res, next) {
        try {
            const charge = await stripeHelper.createCharge(req.body.source, req.body.amount);
            res.responseHandler(charge);
        } catch (err) {
            //return next(createError('Invalid'));
            console.log('Error: ', err);
        }
    },

    addCard: async function (req, res, next) {
        try {
            const card = await stripeHelper.addCard(req.body.id, req.body.source);
            res.responseHandler(card);
        } catch (err) {
            //return next(createError('Invalid Customer Id'));
            console.log('Error: ', err);
        }
    },

    deleteCard: async function (req, res, next) {
        try {
            const confirmation = await stripeHelper.deleteCard(req.body.id, req.body.card);
            res.responseHandler(confirmation);
        } catch (err) {
            //return next(createError('Invalid Customer Id'));
            console.log('Error: ', err);
        }
    },

    getSources: async function (req, res, next) {
        try {
            const cards = await stripeHelper.getSources(req.params.id, req.query.object);
            res.responseHandler(cards);
        } catch (err) {
            //return next(createError('Invalid Customer Id'));
            console.log('Error: ', err);
        }
    },

    createPayment: async function (req, res, next) {
        try {
            const body = req.body;
            console.log('Body from controller: ',body);
            
            let charge;
            if (body.method === 'card') {
                if (body.saveCard === true) {
                    const card = await stripeHelper.addCard(body.id, token);
                    charge = await stripeHelper.createCharge(card, amount);
                }
                else if (body.saveCard === false) {
                    charge = await stripeHelper.createCharge(body.token, body.amount); 
                    console.log('charge: ',charge);
                                
                }
            }
            else if (body.method === 'savedCard') {
                charge = await stripeHelper.createCharge(body.card, body.amount);               
            }
            res.responseHandler(charge);
        } catch (err) {
           //return next(createError('Invalid Customer Id'));
           console.log('Error: ', err);
        }
    }
}