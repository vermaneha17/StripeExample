module.exports = {
    createPayment: async function (req, res, next) {
        const method = req.query.method;
        if (method === 'card') {
            const token = req.query.token;
            const saveCard = req.query.saveCard;
        } else if (method === 'savedCard') {
            const card = req.query.card;
        }
        if(saveCard){
            await addCard(req);
        }
    }
}