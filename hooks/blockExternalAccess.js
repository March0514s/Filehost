module.exports = status => ctx => {
  // Don't block access if this is not an HTTP request.
  // FIXME: Detect Feathers transport instead.
  if (!ctx.params.req) {
    return;
  }

  // FIXME: Send an actual HTTP status code.
  throw new Error(String(status));
};
