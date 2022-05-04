const res = require('express/lib/response');
const { User, Thought } = require('../models/');

const userController = {
 // get all users
 getUsers(req, res) {
  User.find()
   .select('-__v')
   .then((dbUserData) => {
    res.json(dbUserData);
   })
   .catch((err) => {
    console.log(err);
    res.status(500).json(err);
   });
 },
 // get single user by id
 getSingleUser(req, res) {
   User.findOne({_id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
 },
 // create new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);    
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
        .catch(err => res.json(err));
  },
 // delete user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({_id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));  
 // bonus: remove user's associated thoughts on delete ? middleware...
    userSchema.pre('remove', function(next) {
  // 'this' is the user being removed. 
    Thoughts.remove({user_id: this._id}).exec();
    next(); 
  });
  }
}

module.exports = userController;