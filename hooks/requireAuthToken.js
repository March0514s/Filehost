module.exports = () => ctx => {
  if (!ctx.params.token) {
    throw new Error(401);
  }
};
