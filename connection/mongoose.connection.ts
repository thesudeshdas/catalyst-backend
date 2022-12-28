const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const mongooseConnection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    var db = mongoose.connection;
  } catch (err) {
    db.on(
      'error',
      console.error.bind(console, 'MongoDB connection error: ' + err)
    );
  }
};

exports.mongooseConnection = mongooseConnection;
