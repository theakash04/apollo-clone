import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: [String],
  experience: { type: Number, required: true },
  qualification: { type: String, required: true },
  clinicLocation: { type: String, required: true },
  consult_fees: { type: Number },
  image: { type: String, required: true },
  Physical_fees: { type: Number },
  about: [String],
  languages: [String],
  mode: [String],
  isAvailable: { type: Boolean },
  faculty: { type: String, required: true }
})

export const Doctor = mongoose.model('Doctor', doctorSchema);
