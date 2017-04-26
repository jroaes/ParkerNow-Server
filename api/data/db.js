var mongoose = require('mongoose');
var dburl = process.env.MONGODB_URI;

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + dburl);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

// ctrl + c
process.on('SIGINT', function() {
  mongoose.connection.close( function() {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
  });
});

// To servers like heroku
process.on('SIGTERM', function() {
  mongoose.connection.close( function() {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close( function() {
      console.log('Mongoose disconnected through app termination');
      process.kill(process.pid, 'SIGUSR2');
  });
});

// BRING IN SCHEMAS AND MODELS
require('./estacionamientos.model.js');
