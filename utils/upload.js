const fs = require('fs');
const fsRename = require('./fsRename');
const mkdirp = require('./mkdirp');

module.exports = async opts => {
  const st = {
    resumeMode: 'overwrite',
    ...opts || {},
  };

  for (const k of [
    'tmpUploadsDir',
    'uploadsDir',
    'size',
    'hash',
    'stream',
  ]) {
    if (!st[k]) {
      throw new Error(`Missing ${k}.`);
    }
  }

  if (!['append', 'overwrite'].includes(st.resumeMode)) {
    throw new Error(
      `Unknown resumeMode: '${st.resumeMode}'.`,
    );
  }

  st.tmpUploadPath = (
    `${st.tmpUploadsDir}/${st.hash}`
  );

  st.uploadPath = (
    `${st.uploadsDir}/${st.hash}`
  );

  st.bytesReceived = 0;

  await mkdirp(st.uploadsDir);
  await mkdirp(st.tmpUploadsDir);

  st.writeStream = fs.createWriteStream(
    st.tmpUploadPath, {
      flags: {
        append: 'a',
        overwrite: 'w',
      }[st.resumeMode],
    },
  );

  st.stream.on('data', chunk => {
    st.bytesReceived += chunk.length;

    if (st.onProgress) {
      st.onProgress({
        bytesReceived: st.bytesReceived,
        percentage: (st.bytesReceived / st.size) * 100,
      });
    }
  });

  st.stream.pipe(st.writeStream);

  await new Promise((resolve, reject) => {
    st.writeStream.on('error', reject);
    st.writeStream.on('finish', resolve);
  });

  // TODO: Verify size and hash.

  await fsRename(st.tmpUploadPath, st.uploadPath);
};
