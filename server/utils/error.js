const errorResponse = (err, res) => {
  if (
    err.name === "CredentialsError" ||
    err.name === "InvalidUserError" ||
    err.name === "ValidationError"
  ) {
    res.status(400).json({
      name: err.name,
      message: err.message,
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      name: "CredentialsError",
      message: "Invalid Token",
    });
  } else if (err.name === "MailingError") {
    res.status(500).json(err);
  } else {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = errorResponse;
