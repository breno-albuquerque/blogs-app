class CustomError {
  constructor(status, message) {
    this.name = 'CustomError';
    this.status = status || 500;
    this.message = message || 'Internal error';
    this.stack = (new Error()).stack;
  }
}
CustomError.prototype = Object.create(CustomError.prototype);

module.exports = CustomError;