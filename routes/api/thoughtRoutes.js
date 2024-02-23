const router = require('express').Router();
const {
    grabThought,
    grabOneThought,
    newThought
} = require('../../controllers/thoughtControllers');
// /api/thoughts
router.route('/').get(grabThought).post(newThought);
// /api/thoughts/:thoughtsId
router.route('/:thoughtId').get(grabOneThought);

router.route('/:thoughtId/reaction').post(addReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)

module.exports = router;