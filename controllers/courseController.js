const {PrismaClient} = require("@prisma/client");
const HttpException = require("../utils/http-exception");
const ApiFeatures = require('./../utils/ApiFeatures');
const prisma = new PrismaClient();


exports.createCourse = async (req, res, next) => {
  const data = req.body;
  try {
    const course = await prisma.course.create({
      data,
    });
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    console.log('error:', error.message);
    next(new HttpException(422, error.message));
  }
};

exports.registerStudentCourse = async (req, res, next) => {
  const { studentIds } = req.body;
  try {
    const students = await prisma.registeredstudents.createMany({
      data: studentIds,
    });
    res.status(201).json({
      status: 'success',
      students,
    });
  } catch (error) {
    console.log('error:', error.message);
    next(new HttpException(422, error.message));
  }
};

exports.UpdateCourse = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const course = await prisma.course.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    console.log(error.message);
    next(new HttpException(422, error.message));
  }
};

exports.getCourseRegisteredStudents = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const students = await prisma.registeredstudents.findMany({
      where: {
        courseId: parseInt(courseId),
      },
      include: {
        student: true,
      },
    });
    res.status(200).json({
      status: 'success',
      students,
    });
  } catch (error) {
    console.log(error.message);
    next(new HttpException(404, error.message));
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        registeredstudents: {
          select: {
            id: true,
            student: {
              select: {
                studentId: true,
                name: true,
              },
            },
          },
        },
      },
    });
const features = new ApiFeatures(course.find(), req.query)
                .filter()
                .limitfields()
                .paginate();
let course = await features.query;

    res.status(200).json({
      status: 'success',
      courses,
    });
  } catch (error) {
    console.log(error.message);
    next(new HttpException(404, error.message));
  }
};

exports.getSingleCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status: 'success',
      course,
    });
  } catch (error) {
    console.log(error.message);
    loggerUtil.error(error.message);
    next(new HttpException(404, error.message));
  }
};

exports.deleteCourse =  async (req, res, next) => {
    const deleteCourse = await prisma.course.findByIdAndDelete(req.params.id);

    if (!deleteCourse) {
        const error = new HttpException('course with this ID not found!', 404);
        return next(error);
    }

    res.status(204).json({
        status: 'succesful',
        data: {
            course: null
        }
     })
}