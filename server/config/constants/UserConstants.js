exports.EMAIL_VALIDATION_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


exports.PASSWORD_VALIDATION_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@]).{8,}$/;
exports.PASSWORD_VALIDATION_MESSAGE = 'Password must contain One Uppercase, One Lowercase latter, One digit, One special character(_,@) and at least 8 char long';