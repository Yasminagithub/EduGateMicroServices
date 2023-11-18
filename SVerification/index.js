const express = require('express'); 
const app = express();
const port = 3003;
const sVerification = require("./SVerification.js");
//const {etudiantMiddleware}= require('./auth');



app.use(express.json());
app.use("/sv",sVerification);
//app.use("/se",etudiantMiddleware, sEtudiant);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))