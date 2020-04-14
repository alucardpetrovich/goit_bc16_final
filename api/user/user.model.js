import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.createUser = createUser;

function findUserByEmail(email) {
  return this.findOne({ email });
}

function createUser(name, email, passwordHash) {
  return this.create({ name, email, passwordHash });
}

// users
export const userModel = mongoose.model("User", userSchema);
