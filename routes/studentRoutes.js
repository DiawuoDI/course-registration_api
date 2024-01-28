const { Router } = require("express");
const studentRouter = Router();
const studentController = require("../controllers/studentController");

const validations = require("../validations/student")
const auth = require('../utils/tokenUtil')

studentRouter.route('/')
     .post( validations.checkStudentId,
            auth.verifyToken, 
            studentController.registerStudent, )       
     .get(  studentController.getAllStudents)
     studentRouter.route("/assignment").post(studentController.assignStudentCourse)


studentRouter.route('/:id')
    .patch( auth.verifyToken, 
            studentController.UpdateStudent)
     .get(  studentController.getSingleStudent)

module.exports = studentRouter;
   