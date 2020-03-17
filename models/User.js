import mongoose from "mongoose";
import passportLoclaMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLoclaMongoose, { usernameField: "email" });

const model = mongoose.models.User || mongoose.model("User", UserSchema);

export default model;
