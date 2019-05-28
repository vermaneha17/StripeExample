const stripe = require('stripe')('sk_test_KTFcgbUk9qOktilvBbSlaKz4');

module.exports = {
    createCustomer: async function (email, token) {
        try {
            const customer = await stripe.customers.create({
                email: email,
                source: token
            });
            return customer.id;
        } catch (err) {
            return err;
        }
    },

    getCustomer: async function (id) {
        try{
            const customer = await stripe.customers.retrieve(id);
            return customer;
        }catch (err) {
            return err;
        }        
    },

    createCharge: async function (source, amount) {
        try{
            const charge = await stripe.charges.create({
                amount: amount * 100,
                currency: 'usd',
                source: source,
            });
            return charge.id;
        }catch (err) {
            return err;
        }
    },

    addCard: async function (id, source) {
        try{
            const card = await stripe.customers.createSource(id, {
                source: source
            });
            return card.id;
        }catch (err) {
            return err;
        }       
    },

    getSources: async function (id, object) {
        try{
            const cards = await stripe.customers.listSources(id, {
                limit: 3,
                object: object
            });
            return cards;
        }catch (err) {
            return err;
        }       
    },

    deleteCard: async function (id, card) {
        try{
            const confirmation = await stripe.customers.deleteSource(id, card);
            return confirmation;
        }catch (err) {
            return err;
        }
    },

    createPayment: async function (body) {
        try {
            let charge;
            if (body.method === 'card') {
                if (body.saveCard === true) {
                    const card = await addCard(body.id, token);
                    charge = await createCharge(card, amount);
                }
                else if (body.saveCard === false) {
                    charge = await createCharge(body.token, body.amount);
                }
            }
            else if (body.method === 'savedCard') {
                charge = await createCharge(body.card, body.amount);               
            }
            return charge;
        } catch (err) {
           return err;
        }
    }
};