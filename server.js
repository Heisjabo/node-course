const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const paymentRouter = require("./routes/payment");
const postsRouter = require("./routes/postsRouter")

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('db connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.use('/', userRouter);
app.use('/payment', paymentRouter)
app.use('/', postsRouter)

app.listen(PORT, () => console.log(`app started on port ${PORT}`));