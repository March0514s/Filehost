module.exports = (req, entry) => {
  switch (entry.accessPolicy) {
    case 'auth': return !!req.token;
    case 'public': return true;

    default:
      console.warn(
        `[WARN] Invalid or unsupported accessPolicy.`,

        JSON.stringify({
          accessPolicy: entry.accessPolicy,
          owner: entry.owner,
          name: entry.name,
          id: entry._id,
        }),
      );

      return false;
  }
};
