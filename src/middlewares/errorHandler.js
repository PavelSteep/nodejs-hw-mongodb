import createHttpError from "http-errors";
import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};



// import createHttpError from "http-errors";
// import mongoose from "mongoose";

// export const errorHandlerMiddleware = (err, req, res, next) => {
//   if (createHttpError.isHttpError(err)) {
//     return res.status(err.status).json({
//       status: err.status,
//       message: err.message,
//       name: err.name,
//     });
//   }

//   if (err instanceof mongoose.Error) {
//     return res.status(500).json({
//       status: 500,
//       message: err.message,
//       name: "Mongoose Error",
//     });
//   }

//   res.status(500).json({
//     status: 500,
//     message: err.message,
//     name: "Internal Server Error",
//   });
// };
