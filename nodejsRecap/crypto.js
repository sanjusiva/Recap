const crypto = require('crypto');

//generating key
function generateKey(secret) {
  return crypto.createHash('sha256').update(secret).digest('hex').slice(0, 32);
}

// Encrypt
function encrypt(text, secretKey) {
  const iv = crypto.randomBytes(16);
  const key = generateKey(secretKey);

  console.log("key: ",key)
  const cipher = crypto.createCipheriv('aes-256-cbc',key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + encrypted;
}

// Decrypt
function decrypt(encryptedText, secretKey) {
  const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
  const key = generateKey(secretKey);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

const secretKey = 'SecretCode';  
const plaintext = 'Aspire Systems!';

const encryptedData = encrypt(plaintext, secretKey);
console.log('Encrypted:', encryptedData);

const decryptedData = decrypt(encryptedData, secretKey);
console.log('Decrypted:', decryptedData);
