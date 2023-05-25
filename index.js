/**
 * 
 */
const fs = require('fs');
const PassworkAPI = require('passwork-js/src/passwork-api');
const kdbxweb = require('./lib/kdbxweb');
const config = require('./lib/config');

/**
 * Creat a new keepass entry from password
 * 
 * @param {Password} pw
 * @param {KdbxGroup} group 
 * @returns {void}
 */
const createEntry = async (pw, group) => {
    const password = await pw.getPassword();
    const customs = await pw.getCustoms();

    const entry = keepass.createEntry(group);

    entry.fields.set('Title', pw.name);
    entry.fields.set('UserName', pw.login);
    entry.fields.set('URL', pw.url);
    entry.fields.set('Notes', pw.description);
    entry.fields.set('Password', kdbxweb.ProtectedValue.fromString(password));
    entry.tags = pw.tags||[];

    if (customs) {
        // import custom fields
        for(let i=0; i<customs.length; i++) {
          if(customs[i].type === "password") {
            entry.fields.set(customs[i].name, kdbxweb.ProtectedValue.fromString(customs[i].value))
          }
          else {
            entry.fields.set(customs[i].name, customs[i].value)
          }
        }
    }

    if (pw.attachments) {
        // import attachments
        while (pw.attachments.length) {
            const attachment = await passwork.getAttachment(pw.id, pw.attachments.shift().id)
            try {
              // first try
              const data = await attachment.getData();
              entry.binaries.set(attachment.name, data);
            }
            catch(e) {
              console.log("2nd try to download '" +  attachment.name + "' from password '" + pw.name + "'")
              try {
                // second try (see issue https://github.com/passwork-me/js-connector/issues/25)
                const data = await attachment.getData();
                entry.binaries.set(attachment.name, data);
              }
              catch(e) {
                console.error("Unable to get attachment '" + attachment.name + "' from password '" + pw.name + "'")
                console.error(e)
              }
            }
        }
    }
}

/**
 * import passwordlist
 * 
 * @param {array} passwords 
 * @param {KdbxGroup} group
 * @returns {void}
 */
const importPasswords = async (passwords, group) => {
    while(passwords.length) {
        const password = await passwork.getPassword(passwords.shift().id) 
        await createEntry(password, group)
    }
}

/**
 * Import Folderlist
 * 
 * @param {array} folders 
 * @param {KdbxGroup} group 
 * @returns {void}
 */
const importFolders = async (folders, group) => {
    while(folders.length) {
        const folder = folders.shift();
        const subGroup = keepass.createGroup(group, folder.name);

        const passwords = await passwork.getPasswords(null, folder.id);
        await importPasswords(passwords, subGroup)

        const subFolders = await passwork.getSubFolders(folder.id);
        await importFolders(subFolders, subGroup);
    }
}

// passwork instance
const passwork = new PassworkAPI(config.passwork_url);

// new kepass database
const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(config.keepass_password));
const keepass = kdbxweb.Kdbx.create(credentials, 'export');

(async () => {
    // passwork login
    if (config.passwork_masterpass !== null) {
        await passwork.login(config.passwork_token, config.passwork_masterpass);
    }
    else {
        await passwork.login(config.passwork_token);
    }

    // which vaults are to be transferred.
    const vaults = await passwork.getVaults().then(data => {
      const need = config.passwork_vaults;
      return (need.length) ? data.filter(item => need.includes(item.name)) : data;
    });

    if (vaults.length) {
      while(vaults.length) {
        const vault = vaults.shift();
        // new keepass group
        const group = keepass.createGroup(keepass.getDefaultGroup(), vault.name);

        const passwords = await passwork.getPasswords(vault.id);
        await importPasswords(passwords, group);

        const folders = await passwork.getFolders(vault.id);
        await importFolders(folders, group);
      }

      // create new kdbx file
      const buffer = await keepass.save();
      fs.writeFileSync(config.keepass_file, Buffer.from(buffer));
    }
    else {
      console.log("No Vaults found!")
      if (config.passwork_vaults.length) {
        console.log("Check your PASSWORK_VAULTS: " + JSON.stringify(config.passwork_vaults));
      }
    }

  // quit passwork session
  await passwork.logout();


})();
