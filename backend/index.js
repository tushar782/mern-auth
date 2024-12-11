// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routers/AuthRouter.js');
const cors = require('cors');
const app = express();
require('./Models/db');

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is undefined

app.get('/ping', (req, res) => {
    res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('products',AuthRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
