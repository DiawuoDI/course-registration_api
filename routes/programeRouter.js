const { Router } = require('express');
const programeRouter = Router();

const programeController = require('../controllers/programeController');
const validator = require('../validations/programe');
const auth = require('../utils/tokenUtil');

programeRouter.route('/')
    .post( 
           programeController.addPrograme,
           programeController.registerProgrameCourse)
    .get(  auth.verifyToken, 
          programeController.getProgrames)

 programeRouter.route('/:id')
    .get( auth.verifyToken,
       programeController.getSinglePrograme)
    .patch( auth.verifyToken,
       programeController.UpdatePrograme)
    .delete( auth.verifyToken, 
       programeController.deletePrograme)        


module.exports = programeRouter