const res = require('express/lib/response');
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

 // delete user by id

 // bonus: remove user's associated thoughts on delete


}

module.exports = userController;