const express = require('express'); 
const app = express();
const port = 3000;
const sEtudiant = require("./SEtudiant.js");
const sGestionnaire = require("./SGestionnaire.js");
const authentification = require("./auth.js").router;
const {etudiantMiddleware,gestionnaireMiddleware}= require('./auth');



app.use(express.json());
app.use("/auth", authentification);
app.use("/se",etudiantMiddleware, sEtudiant);
app.use("/sg",gestionnaireMiddleware, sGestionnaire);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))