const errorResponse = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      name: err.name,
      message: err.message,
    });
  } else if (err.name === "MongoError" && err.code === 11000) {
    res.status(500).json(err);
  } else if (err.name === "CredentialsError") {
    res.status(400).json(err);
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      name: "CredentialsError",
      message: "Invalid Token",
    });
  } else {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = errorResponse;
