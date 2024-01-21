const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");

router.route('./sigup').post(userController.signup);
router.route('./login').post(userController.login);
router.route('/logout'),get(userController.logout);
router.route('./forgotPassword').post(userController.forgotPassword);
router.route('./restPassword/:token').patch(userController.resetPassword);



module.exports = userRouter