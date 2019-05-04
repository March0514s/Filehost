const getOriginalCtx = require('../utils/getOriginalCtx');

module.exports = () => ctx => {
  const originalCtx = getOriginalCtx(ctx);

  if (
    !originalCtx ||
    !originalCtx.params ||
    !originalCtx.params.token
  ) {
    throw new Error(401);
  }
};
