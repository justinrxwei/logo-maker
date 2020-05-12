var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 1, max: 50},
  borderWidth: { type: Number, min: 1, max: 50},
  padding: { type: Number, min: 1, max: 50},
  margin: { type: Number, min: 1, max: 50},
  logoWidth: { type: Number, min: 10, max: 150 },
  logoHeight: { type: Number, min: 10, max: 150 },
  //textObjectList: [{text: String, color: String, fontSize: { type: Number, min: 2, max: 144 }, x: Number, y: Number}],
  //imageObjectList: [{url: String, scaling: { type: Number, min: 1, max: 100 }, x: Number, y: Number}],
  textObjectList: [],
  imageObjectList: [],

  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);