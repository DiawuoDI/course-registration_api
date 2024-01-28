const {PrismaClient} = require("@prisma/client");
const HttpException = require("../utils/http-exception");
const prisma = new PrismaClient();

exports.addPrograme = async(req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        const programe = await prisma.programes.create({
            data
        });
        res.status(201).json({
            status: 'success',
            programe ,
          });
    } catch (error) {
        console.log('error:', error.message);
       next(new HttpException(422, error.message));
    }
}

//....get all programes....
exports.getProgrames = async(req, res, next) =>{
        try {
          const programes = await prisma.programes.findMany({
            include: {
              course: true
              },
          });
          
      
          res.status(200).json({
            status: 'success',
            programes,
          });
        } catch (error) {
          console.log(error.message);
          next(new HttpException(404, error.message));
        }
};

//.....get a single programe........ 
exports.getSinglePrograme = async (req, res, next) => {
    const { id } = req.params;
    try {
      const programe = await prisma.programes.findUnique({
        where: { id, },
      });
      res.status(200).json({
        status: 'success',
        programe,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(404, error.message));
    }
  };

//   ...register course in a programe...
  exports.registerProgrameCourse = async (req, res, next) => {
    const { courseIds } = req.body;
    try {
      const courses = await prisma.registeredcourse.createMany({
        data: courseIds,
      });
      res.status(201).json({
        status: 'success',
        courses,
      });
    } catch (error) {
      console.log('error:', error.message);
      next(new HttpException(422, error.message));
    }
  };
  
//Check if programe with the given id exist and update
exports.UpdatePrograme = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const programe = await prisma.programe.update({
        where: {
          id: parseInt(id),
        },
        data,
      });
      res.status(201).json({
        status: 'success',
        programe,
      });
    } catch (error) {
      console.log(error.message);
      next(new HttpException(422, error.message));
    }
  };

  //check if programe with id exist and delete
  exports.deletePrograme =  async (req, res, next) => {
    try{
      const programe = await prisma.programe.findByIdAndDelete(req.params.id);
  
      if (!programe) {
          const error = new HttpException('programe with this ID not found!', 404);
          return next(error);
      }

      res.status(204).json({
          status: 'succesful',
          data: {
            programe: null
          }
       })
    } catch (error) {
        console.log(error.message);
        next(new HttpException(404, error.message));
      }
  }