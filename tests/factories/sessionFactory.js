module.exports = () => {
    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    };
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject))
        .toString('base64');
    const Keygrip = require('keygrip');
    const keys = require('../config/keys.js')
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);
}