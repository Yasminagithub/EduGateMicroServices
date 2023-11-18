const router = require("express").Router();
const { DmModification } = require('../db');

router.get('/verify-modification/:idInscription', async (req, res) => {
  const { idInscription } = req.params;

  try {
    const existingDmModification = await DmModification.findOne({ inscription: idInscription });

    if (existingDmModification) {
      res.json({ accepted: existingDmModification.accepted });
    } else {
      res.json({ accepted: false });
    }
  } catch (error) {
    console.error('Error verifying modification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
