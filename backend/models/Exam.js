const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
  name: { type: String, required: true },
  offline: { type: Boolean },
  online: { type: Boolean },
});

module.exports = mongoose.model("Exam", ExamSchema);
