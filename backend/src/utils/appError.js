class AppError extends Error {
  constructor(message, statusCode = 500, type = "SERVER_ERROR") {
    super(message);

    this.statusCode = statusCode; 
    this.type = type;             
    this.isOperational = true;    

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;