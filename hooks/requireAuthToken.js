module.exports = () => ctx => {
  console.log(ctx.params)
  if (!ctx.params.token) {
    throw new Error(401);
  }
};
