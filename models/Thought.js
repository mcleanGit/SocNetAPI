const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction'); 

const ThoughtSchema = new Schema(
  {
    thoughtText: {
     type: String,
     required: "You need to leave a thought.",
     length: 1,
      maxlength: 280
   },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)     
      },
    username: {
     type: String,
     required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON:
      {
        virtuals: true,
        getters: true
      },
      id: false
  }
);
// retrieves length of thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
