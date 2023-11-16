const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Edugate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const DmModification = mongoose.model('dmModification', dmModificationSchema);

module.exports = {DmModification, mongoose};
