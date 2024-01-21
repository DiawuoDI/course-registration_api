const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const HttpException = require('../utils/http-exception');

exports.checkStudentId = async (req, res, next) => {
  const { studentId } = req.body;
  const studentExist = await prisma.students.findUnique({
    where: {
      studentId,
    },
  });
  if (studentExist) {
    next(new HttpException(422, 'Student Already Exist'));
  } else {
    next();
  }
};

exports.checkStudentInClass = async (req, res, next) => {
  const { studentId } = req.body;
  const studentExist = await prisma.studentclass.findFirst({
    where: {
      studentId,
    },
  });
  if (studentExist) {
    next(new HttpException(422, 'Student Already Has a Class'));
  } else {
    next();
  }
};

exports.checkStudentsInClass = async (req, res, next) => {
  const { studentIds } = req.body;
  const studentsExist = await prisma.studentclass.findMany({
    where: {
      id: { in: studentIds },
    },
  });
  if (studentsExist) {
    next(new HttpException(422, 'Students Already Have a Class'));
  } else {
    next();
  }
};
