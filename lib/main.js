// main loop

var mdns = require('./discovery');
var Promise = require('bluebird');
var database = require('./database');
var amqp = require('amqplib');
var debug = require('debug')('d3vice:pammy:main');
var mq = require('./mq');


// I am a new baby and I am clueless
// I need some things to get connected to the gameserver's MQ

// * mqtt ip address
// * mqtt authentication
//   * node approval granted by game admin thru webUI


// DISCOVERY PROCESS
// * check database for known IP address
// * Is there a known ip address in the database?
//   * attempt to connect to MQ
//     * am I connected to MQ?
//       * startup complete
// * use mdns to find IP address of gameserver
// * Associate with gamserver
// * wait for grant



// * @param {Error} err
// //  * @param {object} grant
// //  * @param {string} grant.ip
// //  * @param {number} grant.port
// //  * @param {string} grant.associationToken
// //  * @param {string} grant.loginToken


// check db for known grant
// return database.findOneAsync({
//         "type": "grant"
//     })
return database.insertAsync({
        "type": "grant",
        "grant": {
            "ip": "127.0.0.1",
            "port": "",
            "associationToken": "8234824",
            "loginToken": "9823fjh"
        }
    })
    .then(function(grant) {
        // if there is a grant, attempt to connect to MQ
        // otherwise, quit this chain and try something else
        if (!grant) {
            throw new Error('there is no grant in the database');
        }
        console.log(grant);
        return grant.ip;
    })
    .then(mq.setup)
    // .then(function(conn) {
    //     // set up MQ
    //     var ok = conn.createChannel();
    //     ok = ok.then(function(ch) {
    //         return when.all([
    //             ch.assertQueue('foo'),
    //             ch.assertExchange('bar'),
    //             ch.bindQueue('foo', 'bar', 'baz'),
    //             ch.consume('foo', mq.handleMessage)
    //         ]);
    //     });
    //     return ok;
    // })
    .catch(function(err) {
        console.log("I am your savior error handler promise thingy")
        console.error(err);
    })
    .done()



//
//
// var findGrant = Promise.promisify(getGrantFromDatabase);
// var associate = Promise.promisify(associateWithServer);
//
//
// function ensureGrantAsync() {
//
// }
//
//
//
//
// while (true) {
//     // if we have the IP of a server, use it to connect
//     database.find({
//         "type": "grant"
//     }, function(err, reply) {
//
//     });
//
//     return Q.nfcall(database.findOne, {
//             "type": "grant"
//         })
//         .then()
//
//     if (database.isServerKnown) {
//         var c = mq.connect();
//         if (c.isConnected) {
//             // startup complete
//             return
//         }
//     }
//
//
//     // server IP not known, so lets find it
//     else {
//         var m = mdns.start();
//
//         m.on('serviceUp', function(service) {
//             if (service.name == 'D3VICE') {
//                 associate(service.address);
//             }
//         });
//
//         // disconnect mdns browser after 5s
//         setTimeout(m.stop(), 5000);
//     }
//
//
//
// }
//
//
//
// // Use existing grant to connect if we have one
// findGrant()
//     .then(connect())
//     .fail(function(err) {
//         console.error('failed to use existing grant! ' + err);
//     });
//
// // If we dont have a grant, associate so we can get one
// associate()
//     .fail(function(err) {
//         console.error('failed association! ' + err);
//     });
//
//
// getGrantFromDatabase()
//     .then(associateWithServer())
//     .then()
//
//
//
// /**
//  * findGameServer
//  *
//  * use mdns to discover the ip address/port of the gameserver(s).
//  *
//  * @param {onFoundGameServerCallback} cb -
//  */
// var findGameServer = function findGameServer(cb) {
//         mdns.on('serviceUp', function(service) {
//             //debug("service up: ", service.name);
//             //if (service.name)
//         });
//         mdns.on('serviceDown', function(service) {
//             //debug("service down: ", service.name);
//         });
//
//         mdns.start();
//     }
//     /**
//      * @callback {onFoundGameServerCallback}
//      * @param {Error} err
//      * @param {object} server
//      */
//
//
//
// /**
//  * getGrantFromDatabase
//  *
//  * see if there is already a grant in the database.
//  * a grant can be in the database if we previously connected to a server
//  * the database is checked before associating with a server
//  * because there is no reason to solicit a grant if we already have one.
//  *
//  * @param {onGotGrantFromDatabase} cb
//  */
// var getGrantFromDatabase = function getGrantFromDatabase(cb) {
//     database.findOne({
//         "type": "grant"
//     }, function(err, grant) {
//         if (err) throw err;
//         if (!grant)
//             cb(new Error('There is no grant in the database'), null);
//         return cb(null, grant);
//     });
// };
// /**
//  * @callback {onGotGrantFromDatabase}
//  * @param {Error} err
//  * @param {object} grant
//  * @param {string} grant.ip
//  * @param {number} grant.port
//  * @param {string} grant.associationToken
//  * @param {string} grant.loginToken
//  */
//
//
//
// /**
//  * associateWithServer
//  *
//  * manifest to the server that this node exists
//  * after successful association, the server admin can see this node in the GUI
//  * the admin must then add this node to a game before the node can take part
//  *
//  * @param {onAssociatedCallback} cb
//  */
// var associateWithServer = function associateWithServer(cb) {
//     const superagent = require('superagent');
//     const superagentJsonapify = require('superagent-jsonapify');
//
//     superagentJsonapify(superagent);
//
//     const request = superagent.get('/api/videos?include=comments')
//         .then(function(response) {
//             const body = response.body;
//             const video = body.data[0];
//             const comments = video.comments;
//         });
// };
// /**
//  *
//  */
