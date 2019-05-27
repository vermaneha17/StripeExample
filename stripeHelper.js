const stripe = require('stripe')('sk_test_KTFcgbUk9qOktilvBbSlaKz4');

module.exports = {
    createCustomer: async function (req, res, next) {
        try {
            const customer = await stripe.customers.create({
                email: req.query.email,
                source: req.query.token
            });
            res.responseHandler({ message: 'Customer created', customer });
        } catch (err) {
            next(err);
        }
    },

    createCharge: async function (req, res, next) {
        try {
            const charge = await stripe.charges.create({
                amount: 200,
                currency: 'usd',
                source: req.query.token,
                description: 'Charge for exampleCustome@gmail.com'
            });
            res.responseHandler({ message: 'Charge created', charge });
        } catch (err) {
            next(err);
        }
    },

    addCard: async function (req, res, next) {
        try {
            const card = await stripe.customers.createSource(req.params.id, {
                source: req.query.token
            });
            res.responseHandler({ message: 'Card added', card });
        } catch (err) {
            next(err);
        }
    },

    getSources: async function (req, res, next) {
        try {
            const cards = await stripe.customers.listSources(req.params.id, {
                limit: 3,
                object: req.query.object
            });
            res.responseHandler({ cards: cards });
        } catch (err) {
            next(err);
        }
    }
};