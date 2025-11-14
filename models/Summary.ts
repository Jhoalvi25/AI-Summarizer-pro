import mongoose, { Schema, models } from "mongoose";

const summarySchema = new Schema({
  userEmail: { type: String, index: true },
  fileName: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

export const Summary = models.Summary || mongoose.model("Summary", summarySchema);
