const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const paymentRouter = require("./routes/payment");
const postsRouter = require("./routes/postsRouter");
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('db connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: "welcome to my api"});
})

app.use('/', userRouter);
app.use('/payment', paymentRouter)
app.use('/', postsRouter)

app.listen(PORT, () => console.log(`app started on port ${PORT}`));