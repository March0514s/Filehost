const jwtImpl = require('jsonwebtoken-promisified');

const unsafeSecret = 'unsafeSecret';
const secret = process.env.JWT_SECRET || unsafeSecret;

if (secret === unsafeSecret) {
  console.warn(
    `[WARN] Missing JWT_SECRET. Using unsafe default.`,
  );
}

exports.sign = payload => jwtImpl.signAsync(
  payload, secret,
);

exports.verify = token => jwtImpl.verifyAsync(
  token, secret,
);
