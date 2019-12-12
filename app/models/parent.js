// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define parent Schema
const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String,required: true,unique: true},
  age: { type: Number, default: true },
  phone:{type: Number,default:true},
  relation: {type:String, default: true },
}, {
  timestamps: true,
});

// Compile our Model based on the Schema
const Parent = mongoose.model('Parent', parentSchema);

// Export our Model for use
module.exports = Parent;