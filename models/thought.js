const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new mongoose.Schema(
    {
     thoughtText: {
        type: String,
        required: 'Thought is required',
        minlength: 1,
        maxlength: 280,
     },
     createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
     },
     username: {
        type: String,
        required: true,
     },
     reactions: [reactionSchema],
    },
    {
        toJSON: {
            viutuals: true,
            getters: true,
        },
        id: false,
    },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const thought = model('thought', thoughtSchema);
  
  module.exports = thought;