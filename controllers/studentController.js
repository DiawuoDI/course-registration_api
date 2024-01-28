const {PrismaClient} = require("@prisma/client");
const HttpException = require("../utils/http-exception");
const prisma = new PrismaClient();

//register to a course using your name  and Id
exports.registerStudent = async (req, res, next) => {
    const { courseId, ...data } = req.body;
    try {
      const student = await prisma.student.create({
        data,
      });
      if (courseId) {
        const studentcourse = {
          studentId: student.studentId,
          courseId,
        };
        await prisma.studentcourse.create({
          data: studentcourse,
        });
      }
      res.status(201).json({
        status: 'success',
        student,
      });
    } catch (error) {
      console.log('error:', error.message);
      next(new HttpException(422, error.message));
    }
  };

 //assign each student to courses registerd 
  exports.assignStudentCourse = async (req, res, next) => {
    const data = req.body;
    try {
      const student = await prisma.course.create({
        data,
      });
      res.status(201).json({
        status: 'success',
        student,
      });
    } catch (error) {
      console.log('error:', error.message);
      next(new HttpException(422, error.message));
    }
  };

  //update student in the database his with Id
  exports.UpdateStudent = async (req, res, next) => {
    const { studentId } = req.params;
    const data = req.body;
    try {
      const student = await prisma.student.update({
        where: {
          studentId,
        },
        data,
      });
      res.status(201).json({
        status: 'success',
        student,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(422, error.message));
    }
  };
  
  //get all student in the database
  exports.getAllStudents = async (req, res, next) => {
    try {
      const students = await prisma.student.findMany({});
      res.status(200).json({
        status: 'successfull',
        students,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };

  //get a student with Id
  exports.getSingleStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        status: 'success',
        student,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };