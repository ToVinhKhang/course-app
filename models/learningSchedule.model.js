const mongoose = require("mongoose");

let learningScheduleSchema = new mongoose.Schema({
    teacherId: String,
    learningScheduleId: String,
    courseId: String,
    room: String,
    date: String,
    time: String,
});

let LearningSchedule = mongoose.model(
    "LearningSchedule",
    learningScheduleSchema,
    "learningschedules"
);

module.exports = LearningSchedule;
