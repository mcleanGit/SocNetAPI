const router = require('express').Router();

const {
 getAllThought,
 getThoughtById,
 createThought,
 // need to push created thought _id to user thought array field
 updateThoughtById,
 deleteThoughtById
 // todo :thoughtId/reactions post and delete

} = require('../../controllers/thought-controller');

// /api/thought/<userId>
router.route('/:userId').post(addThought);

// /api/thought/<userId>/<thoughtId>
router
 .route('/:userId/:thoughtId')
 .put(addReaction)
 .delete(removeThought);
 // to check the preceding

 // api/thought/<userId>/<thoughtId>/<reactionId>
 router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

 module.exports = router;