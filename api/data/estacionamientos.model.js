var mongoose = require('mongoose');

var estacionamientoSchema = new mongoose.Schema({
  ubicacion : {
    direccion : String,
    // always store coordinates longitude (E/W), latitude (N/S)
    coordenadas : {
      type : [Number],
      index : '2dsphere'
    }
  },
  precio: {
    type : Number,
    required : true
  }
});

mongoose.model('Estacionamiento', estacionamientoSchema, 'estacionamientos');
