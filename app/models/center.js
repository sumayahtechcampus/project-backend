// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define parent Schema
const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: true },
  description: {type:String, default: true },
  childrens: [
  {type:mongoose.Schema.Types.ObjectId,ref:'Children'}
  ]
}, {
  timestamps: true,
});

// Compile our Model based on the Schema
const Center = mongoose.model('Center', centerSchema);

// Export our Model for use
module.exports = Center;