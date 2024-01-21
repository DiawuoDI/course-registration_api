const {PrismaClient} = require("@prisma/client");
const HttpException = require("../utils/http-exception");
const prisma = new PrismaClient();

exports.registerStudent = async (req, res, next) => {
    const { classId, ...data } = req.body;
    try {
      const student = await prisma.students.create({
        data,
      });
      if (classId) {
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
  exports.assignStudentCourse = async (req, res, next) => {
    const data = req.body;
    try {
      const student = await prisma.studentcourse.create({
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
  exports.UpdateStudent = async (req, res, next) => {
    const { studentId } = req.params;
    const data = req.body;
    try {
      const student = await prisma.students.update({
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
  
  exports.getAllStudents = async (req, res, next) => {
    try {
      const students = await prisma.students.findMany({});
      res.status(200).json({
        status: 'success',
        students,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };