// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define parent Schema
const childrenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String,required: true},
  age: { type: Number, default: true },
  interest:{type: String,default:true},
  school: {type:String, default: true },
  allergy:{type:String,default:true},
  centeres: [
    {type:mongoose.Schema.Types.ObjectId,ref:'Center'}
    ]
},
 {
  timestamps: true,
});

// Compile our Model based on the Schema
const Children = mongoose.model('Children', childrenSchema);

// Export our Model for use
module.exports = Children;