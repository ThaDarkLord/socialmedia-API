const router = require("express").Router();
const {
  grabUsers,
  grabOneUser,
  newUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userControllers");
// /api/user
router.route("/").get(grabUsers).post(newUser);
// /api/users/:userId
router.route("/:userId").put(updateUser).get(grabOneUser).delete(removeUser);
// /api/users/:userId/friend/:friendId
router.route("/:userId/friend/:friendId").delete(removeFriend).post(addFriend);

module.exports = router;
