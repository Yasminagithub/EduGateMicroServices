const express = require('express'); 
const app = express();
const port = 3000;
const sEtudiant = require("./SEtudiant/SEtudiant.js");
const sGestionnaire = require("./SGestionnaire/SGestionnaire.js");
const sVerification = require("./SVerification/SVerification.js");
const authentification = require("./SAuthentification/auth.js").router;
const {etudiantMiddleware,gestionnaireMiddleware}= require('./SAuthentification/auth.js');

const etudiantPort = 3001; // Replace with the port for SEtudiant service
const gestionnairePort = 3002; // Replace with the port for SGestionnaire service
const verificationPort = 3003; // Replace with the port for SVerification service
const authentificationPort = 3004; // Replace with the port for SAuthentification service



app.use(express.json());
app.use("/auth", authentification).listen(authentificationPort, () => console.log(`SAuthentification service listening on port ${authentificationPort}!`));
app.use("/se",etudiantMiddleware, sEtudiant).listen(etudiantPort, () => console.log(`SEtudiant service listening on port ${etudiantPort}!`));
app.use("/sg",gestionnaireMiddleware, sGestionnaire).listen(gestionnairePort, () => console.log(`SGestionnaire service listening on port ${gestionnairePort}!`));
app.use("/sv",sVerification).listen(verificationPort, () => console.log(`SVerification service listening on port ${verificationPort}!`));

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))