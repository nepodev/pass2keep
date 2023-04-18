# pass2keep

Export [passwork](https://passwork.pro/) vaults to keepass.

## Usage

* Self hostet passwork instance (https://passwork.pro/)
* git (optional)
* node >= 12
* yarn or npm

## Install

```shell
git clone https://github.com/nepodev/pass2keep
cd pass2keep
yarn
```

## Usage

Configuration must be passed through environment variables. You can also use an `.env` file.

* `PASSWORK_URL` URL to the Passwork instance
* `PASSWORK_TOKEN` Personal API Key
* `PASSWORK_MASTERPASS` (optional) If you are using a client side encryption.
* `PASWORK_VAULTS` (optional) Vaults to Export. If no vaults are given, all vaults will be exported. 
* `PASWORK_VAULT` (optional) Vault to Export. If no vault is given, all vaults will be exported.
* `KEEPASS_PASSWORD` Password for keepass database
* `KEEPASS_FILE` Full filepath to the new kdbx-file.

## Examples

```bash
## export all my vaults
PASSWORK_URL=https://passwork.example.com/api/v4 \
PASSWORK_TOKEN="MyPersonalToken" \
KEEPASS_PASSWORD=MyVerySecretSecret \
PASSWORK_ZIP_PASS="/path/to/my/export.kdbx" \
node /opt/pass2keep/index.js
```

```bash
## export only two vaults named MyVault and GroupVault
PASSWORK_URL=https://passwork.example.com/api/v4 \
PASSWORK_TOKEN="MyPersonalToken" \
PASSWORK_VAULTS=["MyVault", "GroupVault"] \
KEEPASS_PASSWORD=MyVerySecretSecret \
KEEPASS_FILE="/path/to/my/export.kdbx" \
node /opt/pass2keep/index.js
```
