import mongoose from "mongoose"

const PressReleaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  pdfUrl: String, 
})

export default mongoose.models.PressRelease ||
  mongoose.model("PressRelease", PressReleaseSchema)
