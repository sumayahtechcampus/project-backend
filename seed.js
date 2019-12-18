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
    {
        name: 'Global Art',
        category: 'FUN & LEARN',
        description: 'Art enhances creative, imaginative, and Innovative thinking and skills in children allowing them to learn, to explore and to discover new ‘frontiers’ of thinking and doing things! These lifetime skills will be useful whether they have to deal with an everyday problem at home or school or a work related challenge.',
    },
    {
        name: 'Aqua Tots',
        category: 'FUN & LEARN',
        description: 'Our mission is to help prevent drownings by working with the community to provide a standard of excellence in teaching children and adults water safety.  With years of experience, a comprehensive curriculum, quality swim instructors, state-of-the-art facilities, and convenient locations, Aqua-Tots has it all to serve your family',
    },
   
    {
        name: 'Future Buds',
        category: 'FUN & Think & LEARN',
        description: 'Future Buds Club offers a group of fun activities for children away from the use of devices where we depend on the child completely in terms of movement, focus, balance, thinking, skills and development',
    },
];

// Center.insertMany(centerActivity, (err, centers)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(centers);
//     }
// });

