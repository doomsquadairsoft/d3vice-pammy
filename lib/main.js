// main loop

var mdns = require('./discovery');
var Promise = require('bluebird');
var database = require('./database');
var amqp = require('amqplib');
var debug = require('debug')('d3vice:pammy:main');
var mq = require('./mq');
var superagent = require('superagent');
var superagentJsonapify = require('superagent-jsonapify');

// I am a new baby and I am clueless
// I need some things to get connected to the gameserver's MQ

// * mqtt ip address
// * mqtt authentication
//   * node approval granted by game admin thru webUI


// DISCOVERY PROCESS
// * check database for known IP address (contained in grant in database)
// * Is there a known ip address in the database?
//   * attempt to connect to MQ
//     * am I connected to MQ?
//       * startup complete
// * use mdns to find IP address of gameserver
// * Associate with gamserver
// * wait for grant


/**
 * associateWithServer
 *
 * manifest to the server that this node exists
 * after successful association, the server admin can see this node in the GUI
 * the admin must then add this node to a game before the node can take part
 *
 * @param {object} server - the server to associate with
 * @param {string} server.address - IP address of the server
 * @param {number} server.port
 */
var associateWithServer = function associateWithServer(server) {
    superagentJsonapify(superagent);
    // @todo save the associationToken in the database
    var payload = {
      "associationToken": "abcdef",
      "nodeId": process.env.D3VICE_GUID
    };
    superagent
      .post(server.address+':'+server.port+'/node')
      .send(payload)
      .end(function(response) {
          console.log('next i need to wait for the server to grant me access');
      });
};


var handleNoGrant = function handleNoGrant(err) {
    if (!/no grant/.test(err)) {
      throw err;
    }
    console.warn('no grant was found in the database.');
}


var handleFoundService = function handleFoundService(service) {
    console.log('service found! '+service.name)
    if (service.name == 'D3VICE') {
        associateWithServer(service);
    }
}



var findGameServerAsync = function findGameServerAsync() {
  var p = new Promise(function(resolve, reject) {

    // resolve after 8s of mdns searching
    setTimeout(function() {
      mdns.stop();
      resolve();
    }, 8000);

    // reject if errors
    mdns.on('error', function(err) {
      mdns.stop();
      reject(err);
    });
  });
  mdns.on('serviceUp', handleFoundService);
  mdns.start();
  return p;
}



// * @param {Error} err
// //  * @param {object} grant
// //  * @param {string} grant.ip
// //  * @param {number} grant.port
// //  * @param {string} grant.associationToken
// //  * @param {string} grant.loginToken


// check db for known grant
return database.findOneAsync({
        "type": "grant"
    })
// database.insertAsync({
//         "type": "grant",
//         "grant": {
//             "ip": "127.0.0.1",
//             "port": "",
//             "associationToken": "8234824",
//             "loginToken": "9823fjh"
//         }
//     })
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
    .catch(function(err) {
        // @todo better error handling
        // http://bluebirdjs.com/docs/api/catch.html
        handleNoGrant(err);

        findGameServerAsync()
          .catch(function(err) {
              console.error('there was an error when finding game server')
              console.error(err);
          })
          .done();
    })
    .done();


module.exports = {
  associateWithServer: associateWithServer
}
