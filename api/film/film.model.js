import mongoose from "mongoose";
const { Schema } = mongoose;

const filmSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
});

filmSchema.statics.createFilm = createFilm;

function createFilm(name, genre) {
  return this.create({ name, genre });
}

// films
export const filmModel = mongoose.model("Film", filmSchema);
