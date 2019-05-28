const stripeHelper = require('./stripe');

module.exports = {
    createPayment: async function (body) {
        try {
            console.log('body: ',body);
            
            let charge;
            if (body.method === 'card') {
                if (body.saveCard === true) {
                    const card = await stripeHelper.addCard(body.id, token);
                    charge = await stripeHelper.createCharge(card, amount);
                }
                else if (body.saveCard === false) {
                    charge = await stripeHelper.createCharge(body.token, body.amount); 
                                   
                }
            }
            else if (body.method === 'savedCard') {
                charge = await stripeHelper.createCharge(body.card, body.amount);               
            }
            return charge;
        } catch (err) {
           return err;
        }
    }
}