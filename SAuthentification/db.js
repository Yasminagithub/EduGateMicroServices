const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Edugate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const etudiantSchema = new mongoose.Schema({
  username: String,
  password: String,
  cne: String,
  fullname: String,
});

const gestionnaireSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Gestionnaire = mongoose.model('gestionnaire', gestionnaireSchema);
const Etudiant = mongoose.model('etudiant', etudiantSchema);

module.exports = {Gestionnaire,Etudiant,mongoose};
