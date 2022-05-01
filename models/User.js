const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
     type: String,
     required: true,
     unique: true,
     match: [/.+@.+\..+/, "You must match a valid email address format!"],
    },
    thoughts: [
      {
        type: Schema.Type.ObjectId, 
        ref: "Thought",
      },
    ],
      friends: [
        {
          type: Schema.Type.ObjectId, 
          ref: "User",
        },
    ],
    },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count that retrieves length of user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;