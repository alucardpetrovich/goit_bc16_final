import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Disabled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);
sessionSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

sessionSchema.statics.createSession = createSession;
sessionSchema.statics.findSessionById = findSessionById;

function createSession(userId) {
  return this.create({ userId });
}

function findSessionById(id) {
  return this.findById(id).populate("user");
}

// users
export const sessionModel = mongoose.model("Session", sessionSchema);
