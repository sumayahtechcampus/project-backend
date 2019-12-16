const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Center = require('./app/models/center');
const db = require('./config/db')


// const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(db, { useNewUrlParser: true }, () => {
  console.log('the connection with mongod is established')
});

const centerActivity = [
    {
        name: 'The Learning Zone',
        category: ' FUN & LEARN',
        description: ' We are a vibrant and evolving children’s center located in Riyadh.  Offering a bundle of world renowned Children Programs, with a verity of services ranging from afterschool activities and summer camps, to birthday parties. We support each child’s journey toward his or her social, emotional, cognitive, physical, and aesthetic potential. We continue to improve our services by collaborating with other.',
    },
    {
        name: 'My Gym',
        category: 'FUN & LEARN',
        description: 'My Gym was born out of our passion to teach children in a fun, physically engaging environment. We delighted in seeing childrens eyes light up for all those incredible milestones, from the tentative first steps to tumbling down soft mats. Sharing the parents’ excitement at their children’s accomplishments was the high point of our day',
    },
    {
        name: 'Little explorers',
        category: 'FUN & LEARN',
        description: 'Little Explorers has three unique main areas that helps children develop their sense of individuality and social understanding, learn about spatial and time-related awareness, excite their thirst for knowledge, build their understanding of science and technology and burn off some energy through exercise!',
    },
];

Center.insertMany(centerActivity, (err, centers)=>{
    if(err){
        console.log(err)
    }else{
        console.log(centers);
    }
});
