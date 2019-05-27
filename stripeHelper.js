const stripe = require('stripe')('sk_test_KTFcgbUk9qOktilvBbSlaKz4');

module.exports = {
    createCustomer: async function () {
        try {
            const customer = await stripe.customers.create({
                email: 'exampleCustome@gmail.com',
                source: 'tok_amex'
            });
            console.log('customer', customer);
        } catch (err) {
            return err;
        }
    },

    createCharge: async function () {
        try {
            const charge = await stripe.charges.create({
                amount: 200,
                currency: 'usd',
                source: 'tok_1EedgFGBpUAwKFdDKMkwfB2M',
                description: 'Charge for exampleCustome@gmail.com'
            });
            console.log('charge', charge);
        } catch (err) {
            return err;
        }
    },

    addCard: async function () {
        try {
            const card = await stripe.customers.createSource('cus_F8uoZn63wrZE3j',{
                source: 'tok_1Eeei9GBpUAwKFdDpxkIxw2y'
            });
            console.log('card',card);            
        } catch (err) {
            return err;
        }
    }
};