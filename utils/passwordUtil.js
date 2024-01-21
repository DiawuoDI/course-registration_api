const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(password, salt, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      resolve(hashed);
    });
  });
};
exports.comparePasswordInDb = (plainText, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hashedPassword, (err, isSame) => {
      if (err) {
        return reject(err);
      }
      resolve(isSame);
    });
  });
};

exports.isPasswordChanged = (JWTTimestamp, PasswordChangedTimestamp) => {
  return new Promise(async (resolve, reject) => {
    const PasswordChangedTimestamp = await parseInt.getTime(JWTTimestamp, PasswordChangedTimestamp, (err, isChanged) => {
      if (err) {
        return reject(err);
      }
      resolve(isChanged);
    })
  })
}

exports.createResetPasswordToken = () => {
  return new Promise(async (resolve, reject) => {
    const resetToken = await crypto.randomBytes(32).toString('hax');
    passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hax');
    passwordResetTokenEpires = Date.now() + 10 * 60 * 1000;
    if (err) {
      return reject(err);
    }
    resolve(resetToken);
  })
}