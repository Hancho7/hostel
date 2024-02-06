const handleResponse = (res, status, message, code) => {
  return res.status(status).json({
    status: status < 400 ? "success" : "error",
    message: message,
    code: code || status,
  });
};

module.exports = handleResponse;
