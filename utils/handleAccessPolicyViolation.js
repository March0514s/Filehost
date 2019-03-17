module.exports = (req, res, entry) => {
  console.warn(
    `[WARN] accessPolicy violation attempt.`,

    JSON.stringify({
      clientAddr: req.ip,
      slug: req.params.slug,
      accessPolicy: entry.accessPolicy,
      owner: entry.owner,
      name: entry.name,
      id: entry._id,
    }),
  );

  res.sendStatus(404);
};
