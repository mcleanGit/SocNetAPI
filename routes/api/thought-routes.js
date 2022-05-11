const router = require('express').Router();

const {
 // getThoughts,
 // getSingleThought,
 addThought,
 addReaction,
 removeThought,
 removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
//router.route.get(getThoughts); 
 
// api/thoughts/<thoughtId>
// router.route('/:thoughtId').get(getSingleThought);

// api/thoughts/<userId>
// router.route('/:userId').get(getThoughts);

// api/thoughts/<userId>/<thoughtId>
// router.route('/:userId/thoughtId').get(getSingleThought);

// /api/thought/<userId>
router.route('/:userId').post(addThought);

// /api/thought/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').put(addReaction).delete(removeThought);
 // to check the preceding

 // api/thought/<userId>/<thoughtId>/<reactionId>
 router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

 module.exports = router;