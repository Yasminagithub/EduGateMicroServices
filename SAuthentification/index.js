const express = require('express'); 
const app = express();
const port = 3004;
const authentification = require("./auth.js").router;


app.use(express.json());
app.use("/auth", authentification);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))