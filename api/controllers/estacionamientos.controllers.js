var mongoose = require('mongoose');
var Estacionamiento = mongoose.model('Estacionamiento');

var runGeoQuery = function(req, res) {
  if (isNaN(req.query.lng) || isNaN(req.query.lat)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring lng and lat should be numbers"
      });
    return;
  }

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // a geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    //maxDistance : 2000,
    limit : 3
  };

  Estacionamiento
    .geoNear(point, geoOptions, function(err, results, stats) {
      if (err) {
        console.log("Error finding parkings");
        res
          .status(500)
          .json(err)
      } else {
        console.log('Geo Results', results);
        console.log('Geo Stats', stats);
        res
          .status(200)
          .json(results)
      }

    });
};

module.exports.estacionamientosGetAll = function(req, res) {

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

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
