const { User, Thought } = require('../models');

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
      {  runValidators: true,
          new: true,
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
        .catch((err) => {
          res.status(500).json(err);
      });
  },
 // delete user by id
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userid })
      .then((dbUserData) => { 
        if (!dbUserData) {
          return res.status(404).json ({ message: 'No user with this id' });
        }
        // bonus: remove user's associated thoughts on delete...
        return Thought.deleteMany( {_id: { $in: dbUserData.thoughts } });
      })
       .then(() => {
        res.json({ message: 'User and associated thoughts deleted!'});
       })      
      .catch((err) => { res.status(500).json(err);  
      });
    },
    // add Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends:req.params.friendId } },
      { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => { res.status(500).json(err);  
      });
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:req.params.friendId } },
      { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => { res.status(500).json(err);  
      });
  },
};

module.exports = userController;