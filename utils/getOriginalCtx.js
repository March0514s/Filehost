module.exports = ctx => {
  console.log(ctx.params.originalCtx);
  if (ctx.params && ctx.params.originalCtx) {
    return ctx.params.originalCtx;
  }

  return ctx;
};
