const NeDB = require('nedb');
const conf = require('../config');
const mkdirp = require('mkdirp');

mkdirp.sync(conf.dbDir);

module.exports = name => new NeDB({
  filename: `${conf.dbDir}/${name}.json`,
  autoload: true,
});
