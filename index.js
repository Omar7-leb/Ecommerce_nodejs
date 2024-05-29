const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect.js');
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute.js');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler.js');
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user' , authRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
})