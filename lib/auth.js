var database = require('./database');



/**
 * login
 *
 * grants are received from the gamserver.
 * we get grants when the admin adds our node GUID to the game
 * we use the information in the grant to connect to a rabbitMQ server
 */
var login = function login(grant, cb) {
    if (typeof grant.ip === 'undefined')
        return cb(new Error('no IP address received in grant'));

    if (typeof grant.port === 'undefined')
        return cb(new Error('no port received in grant'));

    if (typeof grant.accociationToken === 'undefined')
        return cb(new Error('no association token received in grant'));

    if (typeof grant.loginToken === 'undefined')
        return cb(new Error('no login token received in grant'));

    // store grant info in database
    database.update({
            "type": "grant"
        }, {
            "type": "grant",
            "grant": grant
        }, {
            "upsert": true
        },

        function(err, numAffected) {
            if (err) return cb(err);
            if (numAffected == 0)
                return cb(new Error('couldnt update database with grant info'));
            return cb(null);
        }
    );


};




module.exports = {
    login: login
}
