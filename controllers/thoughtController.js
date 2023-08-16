const { Thought, User } = require('../models');
const resErr = (res, err) => {
    return res.status(500).json(err.message);
};

module.exports = {
    async allThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            resErr(res, err);
        }
    },
    
    async singleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if(!thought) {
                res.status(404).json({ message: 'Thought with this id not found! 💀' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            resErr(res, err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { 
                    $addToSet: { thoughts: thought._id },
                },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'Thought created but user Id not found!' });
            } else {
                res.json({ message: 'Thought was created!' });
            }
        } catch (err) {
            resErr(res, err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought with this Id not found! 💀' });
            } else {
              res.json(thought);
            }
          } catch (err) {
            resErr(res, err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId, }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought with this Id not found! 💀' });
            } else {
                res.json({ message: 'Thought was deleted!' });
            }
        } catch (err) {
            resErr(res, err);
        }
    },
     
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $addToSet: { reactions: req.body },
                },
                { new: true }
            );
            if (!reaction) {
                res.status(404).json({ message: 'No thought with this Id found! 💀' });
            } else {
                res.json(reaction);
            }
        } catch (err) {
            resErr(res, err);
        }
    },
    
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $pull: { reactions: { reactionId: req.params.reactionId } },
                },
                { new: true }
            );
            if (!reaction) {
                res.status(404).json({ message: 'No thought with this Id found! 💀' });
            } else {
                res.json(reaction);
            }
        } catch (err) {
            resErr(res, err);
        }
    },
};