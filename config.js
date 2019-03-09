Object.assign(exports, {
  serverPort: process.env.PORT || 3001,

  dataDir: `${__dirname}/data`,
  publicDir: `${__dirname}/public`,
});

Object.assign(exports, {
  dbDir: `${exports.dataDir}/db`,
  tmpUploadsDir: `${exports.dataDir}/uploads/tmp`,
  uploadsDir: `${exports.dataDir}/uploads`,
});
