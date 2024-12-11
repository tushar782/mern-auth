const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
  // Create the User Model
  const UserModel = mongoose.model('users', UserSchema);
  
  module.exports = UserModel;