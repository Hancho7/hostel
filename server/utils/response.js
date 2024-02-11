const handleResponse = (res, status, message, code, data) => {
  return res.status(status).json({
    status: status,
    message: message,
    code: code,
    data: data || null,
  });
};

module.exports = handleResponse;
