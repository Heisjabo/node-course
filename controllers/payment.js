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

module.exports = { requestPayment, cashOut, checkBalance}
