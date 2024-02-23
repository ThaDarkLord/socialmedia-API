const { Schema, model } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true }, //add match validation
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts" }],
    friend: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friend.length;
});

const User = model("User", userSchema);

module.exports = User;
