module.exports = function () {
  return function (request, response, next) {
    if (request.headers['x-forwarded-proto'] !== 'https') {
      return response.redirect(
        ['https://', request.get('Host'), request.url].join('')
      );
    }
    next();
  }
};