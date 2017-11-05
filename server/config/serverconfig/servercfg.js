exports.PORT = process.env.PORT || 80;
exports.SESSION_EXPIRATION_TIME = 60 * 2; //seconds
exports.SESSION_SECRET=process.env.SESSION_SECRET;
exports.SESSION_ID_NAME="_GC_ID";