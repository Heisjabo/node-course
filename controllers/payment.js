const PaypackJs = require("paypack-js").default;
require('dotenv').config();

const paypack = new PaypackJs({ client_id: process.env.client_id, client_secret: process.env.client_secret });


const requestPayment = async (req, res) => {
  const paymentNumber = req.body.paymentNumber;
  const amount = req.body.amount;
  try {
    const response = await paypack.cashin({
      number: paymentNumber,
      amount: amount,
      environment: "development",
    });
    console.log(response)
    res
      .status(201)
      .json({
        message: "payment initiated successfully. please confirm your payment.",
        data: response.data,
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const cashOut = async (req, res) => {
  const paymentNumber = req.body.paymentNumber;
  const amount = req.body.amount;
  try {
    const response = await paypack.cashout({
        number: "0780693425",
        amount: amount,
        environment: "development",
      });
    res
      .status(201)
      .json({
        message: "your cashout was made successfully!",
        data: response.data,
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



const checkBalance = async (req, res) => {
  try{
    const response = await paypack.me();
    res.status(200).json(response.data);
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}


const callback = async (req, res) => {
  const requestHash = req.get('X-Paypack-Signature');
  const secret = process.env.PAYPACK_WEBHOOK_SIGN_KEY;

  // Validate webhook authenticity
  const hash = crypto.createHmac('sha256', secret).update(req.rawBody).digest('base64');
  if (hash === requestHash || req.method !== "HEAD") {
    // Webhook is valid, process the payload
    handlePaypackWebhook(req.body);
    res.status(200).send('Webhook Received');
  } else {
    // Invalid webhook, reject
    res.status(403).send('Invalid Webhook Signature');
  }
}

function handlePaypackWebhook(payload) {
  // Implement logic to process the webhook payload
  // Update your application state based on the payment status
  const paymentStatus = payload.status;

  if (paymentStatus === 'success') {
    // Payment was successful, implement your logic here
    console.log('Payment successful:', payload);
  } else {
    // Payment failed, implement your logic here
    console.log('Payment failed:', payload);
  }
}

module.exports = { requestPayment, cashOut, checkBalance, callback}
