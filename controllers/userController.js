const {PrismaClient} = require("@prisma/client");
const sendEmail= require("../uitls/email");
const passwordUtil = require('../utils/passwordUtil');
const HttpException = require("../utils/http-exception");
const tokenUtil = reuire('./utils/tokenUtil')
const prisma = new PrismaClient();
const crypto = require('crypto');

exports.signup = async(req,res, next) => {
    const newUser = await prisma.User.create(req.body);
    const token = tokenUtil.signToken(newUser._id);

    res.status(201).json({
        statu: 'success',
        token,
        data: {
            user:newUser
        }
    });
};

exports.login = async(req, res,next) => {
    const email = req.body.email;
    const password = req.body.password;

 //  check if email & password in request body
if(!email || password){
    const error = new HttpException('Please enter email & password!', 400);
    return next(error)
    }
    // check if user exists with a given email
    const user = await prisma.user.findOne({ email }).select('+password');


 // check if user exists & password matches
 if(!user || !(await passwordUtil.comparePasswordInDb(password, user.password))){
    const error =  new HttpException('Incorrect email or password!', 400);
    return next(error); 
}
const token = tokenUtils.signToken(user._id);

    res.status(201).json({
        statu: 'success',
        token,
    });

}

exports.logout = async (req, res, next) => {
    try {
      const loggedout = 'loggedout';
      tokenUtil.setInvalidToken(loggedout);
      return res.status(200).json({
        status: 'success',
        message: 'logged out',
      });
    } catch (error) {
      next(new HttpException(422, error.message));
    }
  };

  exports.forgotPassword = async (req, res, next) => {
    const user = await prisma.user.findOne({email: req.body.email});

    if(!user){
        const error = new CustomError(' Unable to find user with this emaill', 404);
        next(error);
    }

    const resetToken = user.createResetPasswordToken();

    await user.save({validateBeforeSave: false});
    
    const resetUrl = '${req.protocol}://${req.get (host)}/api/v1/user/resetPassword/${resetToken}';

    const message = 'You have recieved a password reset request . Please use the link below to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 minutes'
    
    try{
    await sendEmail({
        email: user.email,
        subject: 'Password change request recieve',
        message: message
    });

    res.status(200).json({
        status: 'success',
        message: 'password reset link send to your email'
    })
}catch(err){
    user.PasswordResetToken = undefined;
    user.PasswordResetTokenExpires = undefined;
    user.save({validateBeforeSave: false});

    return next(new HttpException('there was an error sendind passwor reset mail.Please try again', 500));
}    
}

exports.resetPassword = async (req,res,next) => {
    //IF THE USER  EXIST WITH THE GIVEN TOKEN & TOKEN HAS NOT EXPIRED
    const token = crypto.createHash('sha256').update(req.params, token).digest('hex');
    const user = await prisma.user.findOne({PasswordResetToken: req.params.token, PasswordResetTokenExpires: {$gt: Date.now()}});

    if(!user){
        const error = new HttpException('Tiken is invalid or has expired!', 400);
        next(error);
    }
     
    //RESETING THE USER PASSWORD
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.PasswordResetToken = undefined;
    user.PasswordResetTokenExpires = undefined;
    user.PasswordChangedAt = Date.now();

    user.save();

    //LOGIN THE USER
    const loginToken = tokenUtil.signToken(user._id);

    res.status(201).json({
        statu: 'success',
        token: loginToken
    });
}