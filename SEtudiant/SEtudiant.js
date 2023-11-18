const router = require("express").Router();
//To communicate between two services
const axios = require('axios');
const {Filiere,DmModification,Inscription} = require('../db');

router.post('/inscrir', async (req, res) => {
  const { idInscription, cne, filiere } = req.body;
  const existingInscription = await Inscription.findOne({ cne });
  if (existingInscription) {
    return res.status(400).json({ message: 'Vous ete deja inscrit' });
  }

  const filiereData = await Filiere.findById(filiere);
  if (filiereData.nbEtu >= 100) {
    return res.status(400).json({ message: 'Cette filiere est plein' });
  }

  dateInscription=Date.now();
  const newInscription = new Inscription({
    idInscription,
    cne,
    filiere,
    dateInscription,
  });
  await newInscription.save();
  res.json(newInscription);
});


router.post('/demodifier/:id', async (req, res) => {
  const { idModification, inscription } = req.body;

  const existingDmModification = await DmModification.findOne({ inscription });
  if (existingDmModification) {
    return res.status(400).json({ message: 'tu a deja demander de modifier' });
  }
  const newDmModification = new DmModification({
    idModification,
    inscription,
  });
  await newDmModification.save();
  res.json(newDmModification);
});

// router.put('/modifier/:id', async (req, res) => {
//     const { idInscription } = req.params;
//     const { cne, filiere } = req.body;

//     const existingDmModification = await DmModification.findOne({ inscription: idInscription });
//     if (existingDmModification) {
//       //appel au service verifier validation from gestionnaire etudiant
//     //add service notification(sms au gestionnaire"faire inscription et effectif atteint", sms au etudiants"valider inscription)
//       if (existingDmModification.accepted) {
//         if(Date.now() - existingDmModification.actionDate < 604800000){
//             await Inscription.updateOne({ idInscription }, { cne, filiere });
//             res.json({ message: 'Inscription modifier' });
//         }else {
//             res.status(400).json({ message: 'Le délai de possibilite de modification est passé' });
//         }
//       } else{
//         res.status(400).json({ message: 'Votre demande de modification n\'a pas été acceptée' });
//       } 
//     } else {
//       res.status(400).json({ message: 'Vous devez d\'abord demander à modifier votre inscription' });
//     }
//   });

//Version with the apply for Service Verification
router.put('/modifier/:id', async (req, res) => {
  const { idInscription } = req.params;
  const { cne, filiere } = req.body;

  try {
    // Call the verification service from SVerification
    const verificationResponse = await axios.get(`http://localhost:3003/verification/verify-modification/${idInscription}`);
    const { accepted } = verificationResponse.data;

    if (accepted) {
      // Modification is accepted
      // Proceed with the modification logic
      const existingDmModification = await DmModification.findOne({ inscription: idInscription });

      if (existingDmModification) {
        if (Date.now() - existingDmModification.actionDate < 604800000) {
          await Inscription.updateOne({ idInscription }, { cne, filiere });
          res.json({ message: 'Inscription modifiée' });
        } else {
          res.status(400).json({ message: 'Le délai de possibilité de modification est passé' });
        }
      } else {
        res.status(400).json({ message: 'Vous devez d\'abord demander à modifier votre inscription' });
      }
    } else {
      res.status(400).json({ message: 'Votre demande de modification n\'a pas été acceptée' });
    }
  } catch (error) {
    console.error('Error in modification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/inscription/:id', async (req, res) => {
  const { id } = req.params;
  const inscription = await Inscription.findById(id);
  if (!inscription) {
    return res.status(404).json({ message: 'Inscription not found' });
  }
  res.json(inscription);
});

module.exports = router;