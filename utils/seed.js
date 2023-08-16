const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');

connection.once('open', async () => {
    await User.create(userSeeds);
    await Thought.create(thoughtSeeds);

    console.log('all done!');
    process.exit(0);
});

