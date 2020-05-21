var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 50},
  borderWidth: { type: Number, min: 0, max: 50},
  padding: { type: Number, min: 0, max: 50},
  margin: { type: Number, min: 0, max: 50},
  logoWidth: { type: Number, min: 50, max: 1000 },
  logoHeight: { type: Number, min: 50, max: 1000 },
  objectList: [],

  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);