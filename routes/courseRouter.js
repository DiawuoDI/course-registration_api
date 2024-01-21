const { Router } = require('express');
const courseRouter = Router();

const courseController = require('../controllers/courseController');
const validator = require('../validations/course');
const auth = require('../utils/tokenUtil');

courseRouter.route('/')
    .post( auth.verifyToken,
           validator.checkstudentsInCourse,
           courseController.registerStudentCourse)
    .get(  auth.verifyToken, 
           courseController.getAllCourses)   


courseRouter.route('/:id')
    .get(  auth.verifyToken,
           courseController.getSingleCourse,
           courseController.getCourseRegisteredStudents)
    .patch( auth.verifyToken,
            courseController.UpdateCourse)
    .delete( auth.verifyToken, 
             courseController.deleteCourse)        


module.exports = courseRouter