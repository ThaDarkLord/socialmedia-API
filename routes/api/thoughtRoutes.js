const router = require('express').Router();
const {
    grabThought,
    grabOneThought,
    newThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtControllers');
// /api/thought
router.route('/').get(grabThought).post(newThought);
// /api/thought/:thoughtId
router.route('/:thoughtId').get(grabOneThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reaction').post(addReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)

module.exports = router;