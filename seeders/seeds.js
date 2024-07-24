const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys');
const User = require('../models/User');
const Prompt = require('../models/Prompt');
const bcrypt = require('bcryptjs');

const NUM_SEED_USERS = 10;
const NUM_SEED_PROMPTS = 40;

// Create users
const users = [];

// users.push(
//   new User ({
//     username: 'demo-user',
//     hashedPassword: bcrypt.hashSync('starwars', 10)
//   })
// )

// for (let i = 2; i < NUM_SEED_USERS; i++) {
//   users.push(
//     new User ({
//       username: `demo-user${i}`,
//       password: 'starwars'
//     })
//   )
// }
  
// Create tweets
const wordbank = ["neck", "coat", "elephant", "person", "spider", "desk", "kite", "alligator", "bus", "swing", "angel", "bow", "cookie", "pie", "sea", "suitcase", "flag", "oval", "box", "crayon", "airplane", "skateboard", "duck", "pizza", "love", "banana", "bell", "car", "slide", "ant", "girl", "bike", "beak", "bee", "caterpillar", "jellyfish", "bread", "butterfly", "corn", "computer"];
const prompts = [];

for (let i = 0; i < NUM_SEED_PROMPTS; i++) {
  prompts.push(
    new Prompt ({
      word: wordbank[i],
    })
  )
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and prompts...");
  
    User.collection.drop()
                   .then(() => Prompt.collection.drop())
                   .then(() => User.insertMany(users))
                   .then(() => Prompt.insertMany(prompts))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
}