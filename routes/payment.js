const express = require("express");
const router = express.Router();
const { requestPayment, cashOut, checkBalance } = require("../controllers/payment")

router.post("/pay", requestPayment);
router.post("/cashout", cashOut);
router.get("/checkBalance", checkBalance);

module.exports = router;