const express = require('express'); 
const app = express();
const port = 3002;
const sGestionnaire = require("./SGestionnaire.js");
const {gestionnaireMiddleware}= require('./auth');



app.use(express.json());
app.use("/sg",gestionnaireMiddleware, sGestionnaire);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))