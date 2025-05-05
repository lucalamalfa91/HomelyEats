const stripe = require("stripe")(process.env.STRIPE_SECRET);
module.exports = async function (context, req) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: req.body.title },
        unit_amount: Math.round(req.body.price * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://tuaapp.com/success',
    cancel_url: 'https://tuaapp.com/cancel',
  });
  context.res = { status: 200, body: { url: session.url } };
};