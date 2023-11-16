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

const inscriptionSchema = new mongoose.Schema({
  idInscription: String,
  cne: String,
  filiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filiere',
  },
  dateInscription: Date,
});

const filiereSchema = new mongoose.Schema({
  idFiliere: String,
  nom: String,
  nbEtu: Number,
});

const dmModificationSchema = new mongoose.Schema({
  idModification: String,
  inscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inscription',
  },
  actionDate: Date,
  accepted: Boolean,
});

const Gestionnaire = mongoose.model('gestionnaire', gestionnaireSchema);
const Etudiant = mongoose.model('etudiant', etudiantSchema);
const Inscription = mongoose.model('inscription', inscriptionSchema);
const Filiere = mongoose.model('filiere', filiereSchema);
const DmModification = mongoose.model('dmModification', dmModificationSchema);

module.exports = {Gestionnaire,Etudiant,Inscription, Filiere, DmModification, mongoose};
