const { Thought, User } = require('../models');

const thoughtController = {
 // get all thoughts
 getThoughts(req, res) {
   Thought.find()
    .sort( { createdAt: -1 })
    .then((dbThoughtData) => {
      res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
 },
 // get single thought
 getSingleThought(req, res) {
  Thought.findOne( { _id: req.params.thoughtId })
   .then((dbThoughtData) => {
     if(!dbThoughtData) {
       return res.status(404).json( { message: 'No thought with this id!'});
     }
     res.json(dbThoughtData)
   })
   .catch((err) => {
     res.status(500).json(err);
   });
},
 // create Thought
 createThought(req, res) {
  Thought.create(req.body)
   .then((dbThoughtData) => {
    return User.findOneAndUpdate(
     { _id: params.body.userId },
     { $push: { thoughts: dbThoughtData._id } },
     { new: true }
    );
   })
   .then((dbUserData) => {
    if (!dbUserData) {
     res.status(404).json( { message: 'No user found with this id!' });
     return;
    }
     res.json( { message: 'Thought successfully created!'});
   })
    .catch((err) => {
      res.status(500).json(err);
    });
 },
 // update thought
 updateThought(req, res) {
  Thought.findOneAndUpdate( 
    { _id: req.params.thoughtId }, 
    { $set: req.body }, 
    { runValidators: true, new: true }) 
   .then((dbThoughtData) => {
     if(!dbThoughtData) {
       return res.status(404).json( { message: 'No thought with this id!'});
     }
     res.json(dbThoughtData)
   })
   .catch((err) => {
     res.status(500).json(err);
   });
},
// delete thought
deleteThought(req, res) {
  Thought.findOneAndDelete({_id: req.params.thoughtId })
  .then((dbThoughtData) => {
    if (!dbThoughtData) {
      return res.status(404).json ({ message: 'No thought with this id!'});
    }
    res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },
 // add reaction to thought
 // { params, body } changed back to req, res
  addReaction(req, res) {
   Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body }, 
    { runValidators: true, new: true }) 
   .then(dbThoughtData => {
    if (!dbThoughtData) {
     res.status(404).json({ message: 'No user found with this id!' });
     return;
    }
    res.json(dbThoughtData);
   })
    .catch(err => res.json(err));
  },
  /* remove thought -- see delete thought above
  removeThought({ params }, res) {
   Thought.findOneAndDelete({ _id: params.commentId })
    .then(deletedThought => {
     if (!deletedThought) {
      return res.status(404).json({ message: 'No thought with this id!' });
     }
     return User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { thoughts: params.thoughtId } },
      { new: true }
     );
    })
    .then(dbUserData => {
     if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
     }
     res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  */
  // remove reaction
  removeReaction( { params }, res) {
   Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { replyId: params.replyId } } },
    { new: true }
   )
   .then(dbUserData => res.json(dbUserData))
   .catch(err => res.json(err));
  }
};

module.exports = thoughtController;