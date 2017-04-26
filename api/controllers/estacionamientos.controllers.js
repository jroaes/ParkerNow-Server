var mongoose = require('mongoose');
var Estacionamiento = mongoose.model('Estacionamiento');

module.exports.estacionamientosGetAll = function(req, res) {
  Estacionamiento
    .find()
    .exec(function(err, estacionamientos) {
      if (err) {
        console.log("Se produjo un error.");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Estacionamientos encontrados: ", estacionamientos.length);
        res
          .status(200)
          .json(estacionamientos);
      }
    });
}
