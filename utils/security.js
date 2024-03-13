import crypto from 'crypto';

export function sha1HashPassword(userPassword) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(userPassword, 'utf8');
  return sha1.digest('hex');
}

export default { sha1HashPassword };
