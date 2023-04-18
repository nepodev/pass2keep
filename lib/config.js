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

    get passwork_vaults () {
        return process.env.PASSWORK_VAULTS ?
            JSON.parse(process.env.PASSWORK_VAULTS) :
            process.env.PASSWORK_VAULT ? [process.env.PASSWORK_VAULT] : [];
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
