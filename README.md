# passwork2keepass

Import passwork vaults to keepass.

## Install

```shell
git clone https://github.com/nepodev/pass2keep
cd pass2keep
yarn
```

## Usage

All params are provided via enviroment. .env files are also usable

* `PASSWORK_URL`
* `PASSWORK_TOKEN`
* `PASSWORK_VAULT` (optional) if no vault is given all vaults will import.
* `KEEPASS_PASSWORD` Password for keepass database
* `KEEPASS_FILE` Full filepath to the new kdbx-file.


