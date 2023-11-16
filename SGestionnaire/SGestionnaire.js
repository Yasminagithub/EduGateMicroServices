const router = require("express").Router();
const {DmModification}= require('./db');

router.post('/acceptModification/:id', async (req, res) => {
  const id = req.params.id;
  const dmModification = await DmModification.findById(id);
  if (!dmModification) {
    return res.status(404).json({ message: 'DM modification not found' });
  }
  dmModification.accepted = true;
  dmModification.actionDate = Date.now();
  await dmModification.save();
  res.json({ message: 'Modification request accepted' });
});

router.post('/cancelModification/:id', async (req, res) => {
  const id = req.params.id;
  const dmModification = await DmModification.findById(id);
  if (!dmModification) {
    return res.status(404).json({ message: 'DM modification not found' });
  }
  dmModification.accepted = false;
  dmModification.actionDate = Date.now();
  await dmModification.save();
  res.json({ message: 'Modification request cancelled' });
});

router.get('/demandes', async (req, res) => {
  const dmModifications = await DmModification.find();
  res.json(dmModifications);
});

router.get('/attdemandes', async (req, res) => {
  const dmModifications = await DmModification.find({ accepted: null, actionDate: null });
  res.json(dmModifications);
});

router.get('/accepteddemandes', async (req, res) => {
  const dmModifications = await DmModification.find({ accepted: true });
  res.json(dmModifications);
});

router.get('/canceleddemandes', async (req, res) => {
  const dmModifications = await DmModification.find({ accepted: false });
  res.json(dmModifications);
});

module.exports = router;