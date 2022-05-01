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

 // create new user

 // update user by id

 // delete user by id

 // bonus: remove user's associated thoughts on delete


}

module.exports = userController;