const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/softwarejune")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    //match: pattern//
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    //uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have atleast one tag!",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 220,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
});


//form

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Sass course",
    category: "web",
    author: "Jefe",
    tags: ['backend'],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();

// mongoose.Query
// async function getCourse(){
//     const course = await Course.find({});
//     console.log(course);
// }
// getCourse();

// async function getCourses() {
//     const courses = await Course
//     .find({ author: 'Cyril', isPublished: true });
//     console.log(courses);
// }
// getCourses();

// async function getCourses() {
//     const courses = await Course
//     .find({author: 'Jefe', isPublished: true })
//     .limit(2)
//     .sort({ date: 1 })
//     .count()
//     .select({name: 1, tags: 1})
//     console.log(courses);
// }
// getCourses();
