const stripeHelper = require('./stripe');

module.exports = {
    createPayment: async function (req, res, next) {
        try {            
            console.log('request body',req.body);
            
            let charge;
            if (req.body.method === 'card') {
                if (req.body.saveCard === true) {
                    const card = await stripeHelper.addCard(req.body.id, req.body.token);
                    charge = await stripeHelper.createCharge(card, req.body.amount);
                }
                else if (req.body.saveCard === false) {
                    charge = await stripeHelper.createCharge(req.body.token, req.body.amount);
                }
            }
            else if (req.body.method === 'savedCard') {
                charge = await stripeHelper.createCharge(req.body.card, req.body.amount);
                console.log('charge',charge);                
            }
            return charge;
        } catch (err) {
           return err;
        }
    } 
}