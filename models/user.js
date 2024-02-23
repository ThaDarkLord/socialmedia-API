const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true }, //add match validation
    thought: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friend: [{ type: Schema.Types.ObjectId, ref: "user" }],
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
