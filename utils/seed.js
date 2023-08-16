const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const clearDB = require('./clearDB');

connection.once('open', async () => {
    await clearDB('Thought', 'thoughts', 'User', 'users');
    await User.deleteMany({});
    await User.create(userSeeds);
    await Thought.create(thoughtSeeds);

    console.log('all done!');
    process.exit(0);
});


User.insertMany(userSeeds)
    .then(docs => {
        console.log(docs);
    })
    .catch(error => {
        console.error(error);
    });

Thought.insertMany(thoughtSeeds)
    .then(docs => {
        console.log(docs);
    })
    .catch(error => {
        console.error(error);
    });

