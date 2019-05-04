const createModel = require('../../utils/createModel');
module.exports = createModel('dirEntries');

// Create the global root dirEntry (if it doesn't exist).
module.exports.update(
  { _id: 'root' },
  {},

  { upsert: true },

  err => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
  },
);
