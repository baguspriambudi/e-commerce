const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = 4000
const dotenv = require('dotenv')

const login = require('./route/login_route')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("mongodb connected"))
    .catch((err) => {
        console.log(err);
    });

const router = express.Router()
router.post('/auth/login', login.login)
app.use('/api/v1', router)

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        error: error.message,
    })
})

app.listen(PORT, console.log('listening to PORT ' + PORT))