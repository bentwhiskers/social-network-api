const { Thought, User } = require('../models');
const resErr = (res, err) => {
    return res.status(500).json(err.message);
};

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
          const users = await User.find({});
          res.json(users);
        } catch (err) {
          resErr(res, err);
        }
      },
      // get single user
      async getSingleUser(req, res) {
        try {
          const singleUser = await User.findOne({_id: req.params.userId,}).populate("thoughts");
          if (!singleUser) {
            res.status(404).json({ message: 'User with this Id not found! 💀' });
          } else {
            res.json(singleUser);
          }
        } catch (err) {
          resErr(res, err);
        }
      },
      // post user
      async postUser(req, res) {
        try {
          const createdUser = await User.create(req.body);
          res.json(createdUser);
        } catch (err) {
          resErr(res, err);
        }
      },
      // delete user
      async deleteUser(req, res) {
        try {
          const deleteUser = await User.findOneAndDelete({_id: req.params.userId,});
          if (!deleteUser) {
            return res.status(404).json({ message: 'User with this Id not found! 💀' });
          };
          // delete associated thoughts
          const deletedThoughts = await Thought.deleteMany({
            username: deleteUser.username,
          });
          if (!deletedThoughts) {
            res.status(404).json({ message: 'User deleted but no thoughts found! 💀' });
          } else {
            res.json({ message: 'User and thoughts deleted successfully!' });
          }
        } catch (err) {
          resErr(res, err);
        }
      },
      // update user
      async updateUser(req, res) {
        try {
          const updateUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
          );
          if (!updateUser) {
            res.status(404).json({ message: 'User with this Id not found! 💀' });
          } else {
            res.json(updateUser);
          }
        } catch (err) {
          resErr(res, err);
        }
      },
      // add friend
      async addUserFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { _id: req.params.friendId } } },
            { new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this Id found! 💀' });
          } else {
            res.json(user);
          }
        } catch (err) {
          resErr(res, err);
        }
      },
      // delete friend
      async deleteFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
              $pull: { friends: req.params.friendId },
            },
            { new: true }
          );
          if (!user) {
            res.status(404).json({ message: 'No user with this Id found! 💀' });
          } else {
            res.json(user);
          }
        } catch (err) {
          resErr(res, err);
        }
      },
    };