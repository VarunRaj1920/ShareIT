import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  content: { type: String, required: true },
});

export default mongoose.models.Code || mongoose.model("Code", CodeSchema);
