/**
 * This server listens for authorization grants from the gameserver
 *
 * the grant contains:
 *   * IP address of gameserver's RabbitMQ server
 *   * port of gameserver's RabbitMQ server
 *   * original request token (node generates this when node associates)
 *   * login token (password to log into RabbitMQ)
 *
 * The grant is used to log into RabbitMQ, where mq.js will
 * listen for further instructions
 *
 * @todo future security idea is to only accept grants from sources
 *       who can prove to be an actual D3VICE server (not a hacking player)
 *       one idea for this is to implement SSL
 */


const express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('d3vice:pammy:server');
var grant = require('./grant');
var server = express();


var port = process.env.PORT || 83439;

server.use(bodyParser.json());
server.post('/api/v1/grant', function(req, res) {
  debug(req.body);
  if (!req.body)
    return res.status(400).json({
      "success": false,
      "reason": "There was no body received in your request"
    });

    // @todo accept grant, act on grant.


  return res.status(200).json({
    "success": true
  });
});




server.listen(port);


module.exports = server;
