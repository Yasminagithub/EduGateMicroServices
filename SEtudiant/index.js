const express = require('express'); 
const app = express();
const port = 3001;
const sEtudiant = require("./SEtudiant.js");
const {etudiantMiddleware}= require('../SAuthentification/auth');



app.use(express.json());
app.use("/se",etudiantMiddleware, sEtudiant);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))