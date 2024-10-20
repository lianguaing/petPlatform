/**
 * 自定义404错误
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
/**
 * 请求成功
 */
function success(res, message = "请求成功", data = {}, code = 200) {
  res.status(code).json({
    status: true,
    message,
    data,
  });
}
/**
 * 请求失败
 */
function failure(res, error) {
  if (error.name === "SequelizeValidationError") {
    const validationErrors = error.errors.map((err) => err.message); // 提取所有验证错误信息
    return res.status(400).json({
      status: false,
      message: "请求参数错误",
      errors: validationErrors, // 返回所有验证错误信息
    });
  }
  if (error.name === "NotFoundError") {
    return res.status(404).json({
      status: false,
      message: "资源未找到",
      errors: [error.message], // 返回错误信息
    });
  }
  return res.status(500).json({
    status: false,
    message: "服务器错误",
    errors: [error.message],
  });
}

module.exports = {
  NotFoundError,
  success,
  failure,
};
