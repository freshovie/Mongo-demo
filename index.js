const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/softwarejune')
.then(() => console.log('connected to mongoDB...'))
.catch(err => console.log('could not connect to mongoDB...', err))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
    name: 'BOOTSTRAP course',
    author: 'Jefe',
    tags: ['scss', 'frontend'],
    isPublished: true
    })
    const result = await course.save();
    console.log(result);
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

async function getCourses() {
    const courses = await Course
    .find({author: 'Jefe', isPublished: true })
    .limit(2)
    .sort({ date: 1 })
    .count()
    .select({name: 1, tags: 1})
    console.log(courses);
}
getCourses();