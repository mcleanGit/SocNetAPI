const router = require('express').Router();
const {
 getAllUser,
 getUserById,
 createUser,
 updateUser, 
 deleteUser
} = require('../../controllers/user-controller');

//api/users
router
 .route('/')
 .get(getAllUser)
 .post(createUser);

 //api/users/:id
 router
  .route('/:id')
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser);

  module.exports = router;