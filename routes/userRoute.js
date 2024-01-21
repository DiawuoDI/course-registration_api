const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");

userRouter.route('/signup').post(userController.signup);
userRouter.route('/login').post(userController.login);
userRouter.route('/logout').get(userController.logout);
userRouter.route('/forgotPassword').post(userController.forgotPassword);
userRouter.route('/restPassword/:token').patch(userController.resetPassword);



module.exports = userRouter