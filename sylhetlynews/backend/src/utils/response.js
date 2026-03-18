export const sendSuccess = (res, data, message = "OK") => {
  return res.status(200).json({ success: true, message, data });
};

export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};
