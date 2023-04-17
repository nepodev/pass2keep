# pass2keep

Export passwork vaults to keepass.

## Usage

* Self hostet passwork instance ()
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
* `PASWORK_VAULT` (optional) Vault to Export. If no vault is given, all vaults will be exported. 
* `KEEPASS_PASSWORD` Password for keepass database
* `KEEPASS_FILE` Full filepath to the new kdbx-file.

## Example

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
## export only one vault named MyVault
PASSWORK_URL=https://passwork.example.com/api/v4 \
PASSWORK_TOKEN="MyPersonalToken" \
PASSWORK_VAULT="MyVault" \
KEEPASS_PASSWORD=MyVerySecretSecret \
KEEPASS_FILE="/path/to/my/export.kdbx" \
node /opt/pass2keep/index.js
```
