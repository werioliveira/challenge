require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./app/routes');
const session = require('./config/session');

app.use(session);
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 4000;
app.use(routes);

app.listen(PORT, console.log(`Server running on port: ${PORT}`))