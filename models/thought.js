const { model, Schema, Types } = require('mongoose');
let dateFormat;
import('dateformat').then(module => {
    dateFormat = module.default;
});

const reactionSchema = new Schema(
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
            default: Date.now(),
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

const thoughtSchema = new Schema(
    {
     thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
     },
     createdAt: {
        type: Date,
        default: Date.now(),
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
  
const Thought = model('Thought', thoughtSchema);
  
module.exports = Thought;