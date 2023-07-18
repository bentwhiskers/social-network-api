const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Username is required',
    },
    email: {
        type: String,
        unique: true,
        required: 'Username is required',
        match: [/.+\@.+\..+/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const user = model('user', userSchema);
  
  module.exports = user;