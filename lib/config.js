require('dotenv').config();

module.exports = {
    get passwork_url () {
        return process.env.PASSWORK_URL;
    },
    get passwork_token () {
        return process.env.PASSWORK_TOKEN;
    },

    get passwork_masterpass () {
        return process.env.PASSWORK_MASTERPASS || null
    },

    get passwork_vault () {
        return process.env.PASSWORK_VAULT || null;
    },
    get passwork_tag () {
        return process.env.PASSWORK_TAG;
    },

    get keepass_password () {
        return process.env.KEEPASS_PASSWORD;
    },
    get keepass_file () {
        return process.env.KEEPASS_FILE;
    }
}
