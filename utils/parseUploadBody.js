const Busboy = require('busboy');

module.exports = req => {
  const bb = new Busboy({
    headers: req.headers,
    limits: { files: 1 },
  });

  const st = {};

  st.fields = {};

  bb.on('field', (key, val, keyTrunc, valTrunc) => {
    st.fields[key] = { key, val, keyTrunc, valTrunc };
  });

  st.file = new Promise((resolve, reject) => {
    bb.once('error', reject);

    bb.once('file', (key, file, name, encoding, mime) => {
      for (const k of Object.keys(st.fields)) {
        const field = st.fields[k];

        if (field.keyTrunc || field.valTrunc) {
          reject(new Error(
            `Field '${field.key}' too large.`,
          ));
        }
      }

      resolve({ name, mime, stream: file });
    });

    bb.once('finish', () => {
      if (!st.file) {
        resolve(null);
      }
    });
  });

  st.finished = (async () => {
    const file = await st.file;

    if (!file) {
      throw new Error(`Missing file.`);
    }

    await new Promise((resolve, reject) => {
      let trailingFields = false;

      bb.once('field', key => {
        trailingFields = true;

        reject(new Error(
          `Trailing field '${key}' must come before ` +
          `file field.`,
        ));
      });

      bb.once('error', err => {
        if (!trailingFields) {
          reject(err);
        }
      });

      bb.once('finish', () => {
        if (!trailingFields) {
          resolve();
        }
      });
    });
  })();

  // Workaround for unhandled promise rejection errors.
  st.finished.catch(() => null);

  req.pipe(bb);

  return st;
};
