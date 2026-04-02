const bcrypt = require('bcrypt');
const dotenv  = require('dotenv');

dotenv.config();

const hashPassword = async (password) => {
    return bcrypt.hash( password, Number(process.env.BCRYPT_SALT_ROUNDS) );
}

const comparePassword = async ( password, hash ) => {
    return bcrypt.compare( password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
};