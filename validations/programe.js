const {PrismaClient} = require("@prisma/client");
const HttpException = require('../utils/http-exception');
const prisma = new PrismaClient();

exports.checkPrograme = async (req, res, next) => {
  const { programeName } = req.body;
  const programeExist = await prisma.programe.findFirst({
    where: {
      OR: [
        {
          programeName,
        },
      ],
    },
  });
  if (programeExist) {
    next(new HttpException(422, 'Programe Already Exist'));
  } else {
    next();
  }
};
exports.checkCoursesInPrograme = async (req, res, next) => {
  const { courseIds } = req.body;
  const programeExist = await prisma.registeredCourses.findMany({
    where: {
        courseId: { in: courseIds?.map((item) => item.courseId) },
        programeId: courseIds[0]?.courseId,
    },
  });
  if (programeExist.length > 0) {
    let message = '';
    programeExist.map((error) => {
      console.log(error);
      message += error.courseId + ', ';
    });
    next(
      new HttpException(
        422,
        `Course with ID (${message}) ${
            programeExist.length > 1 ? 'have' : 'has'
        } Already Registered this programe`
      )
    );
  } else {
    next();
  }
};