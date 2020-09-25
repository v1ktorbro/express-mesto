class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statuscCode = 404;
  }
}

module.exports = NotFoundError;
