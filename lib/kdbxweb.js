const kdbxweb = require('kdbxweb');
const argon2 = require('argon2');

/**
 * Bind kdbxweb and argon2
 * ref: https://github.com/keeweb/kdbxweb#kdbx4 
 * 
 * don't ask me.
 */
kdbxweb.CryptoEngine.argon2 = (password, salt, memory, iterations, length, parallelism, type, version) => {
    return argon2.hash(password, {
        hashLength: length,
        timeCost: iterations,
        memoryCost: memory,
        parallelism,
        type,
        version,
        salt: Buffer.from(salt),
        raw: true,
    });
};

module.exports = kdbxweb;
