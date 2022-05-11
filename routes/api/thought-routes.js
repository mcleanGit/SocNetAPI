const router = require('express').Router();

const {
 getThoughts,
 getSingleThought,
 createThought,
 updateThought,
 deleteThought,
 addReaction,
 removeReaction,
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/').get(getThoughts).post(createThought); 
 
// api/thoughts/<thoughtId>
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/<userId>
router.route('/:thoughtId/reactions').post(addReaction);

 // api/thought/<userId>/<thoughtId>/<reactionId>
 router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

 module.exports = router;