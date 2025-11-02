import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: "Guest", maxlength: 120 },
  email: { type: String, required: true, trim: true, maxlength: 320 },
  message: { type: String, required: true, maxlength: 4000 },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
