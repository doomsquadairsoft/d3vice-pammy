var player = require('./player');
var queue = require('./localQueue');
var amqp = require('amqplib');
var debug = require('debug')('d3vice:pammy');

if (typeof process.env.D3VICE_GUID === 'undefined')
    throw new Error('D3VICE_GUID is not defined in env');


// amqp.connect('amqp://localhost', function(err, conn) {
//     conn.createChannel(function(err, ch) {
//         var ex = 'd3vice';
//         ch.assertExchange(ex, 'topic', {
//             durable: false
//         });
//         ch.assertQueue('', {
//             durable: false
//         }, function(err, q) {
//             console.log(
//               " [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
//
//             ch.bindQueue(q.queue, ex, 'd3vice.pammy.all.#');
//             ch.bindQueue(q.queue, ex, 'd3vice.pammy.'+process.env.D3VICE_GUID+'.#');
//
//             ch.consume(q.queue, function(msg) {
//                 console.log(
//                   " [x] %s:'%s'", msg.fields.routingKey, msg.content.toString()
//                 );
//
//                 var data;
//                 try {
//                     data = JSON.parse(msg.content.toString());
//                 } catch (e) {
//                     console.error(e);
//                     console.error(
//                       'got unparseable data from mq: %s', msg.content.toString()
//                     );
//                     return;
//                 }
//
//                 var routingKey = msg.fields.routingKey;
//                 debug(routingKey.substring(routingKey.lastIndexOf('.')+1));
//
//                 var audioOpts = {
//                     type: data.type || routingKey.substring(routingKey.lastIndexOf('.')+1),
//                     path: data.path,
//                     text: data.text || 'test',
//                     voice: data.voice,
//                     speed: data.speed
//                 };
//
//                 // priorityQueue. 4 is priority level
//                 queue.push(audioOpts, 4, function(err) {
//                     if (err)
//                         console.error('error when adding to queue: %s', err);
//                     debug("all good in the neighborhood");
//                 });
//
//             }, {
//                 noAck: true
//             });
//         });
//     });
// });


function parseMessage(msg, cb) {
    console.log(
        " [x] %s:'%s'", msg.fields.routingKey, msg.content.toString()
    );

    var data;
    try {
        data = JSON.parse(msg.content.toString());
    } catch (e) {
        console.error(e);
        console.error(
            'got unparseable data from mq: %s', msg.content.toString()
        );
        return;
    }

    var routingKey = msg.fields.routingKey;
    debug(routingKey.substring(routingKey.lastIndexOf('.') + 1));

    var audioOpts = {
        type: data.type || routingKey.substring(routingKey.lastIndexOf('.') + 1),
        path: data.path,
        text: data.text || 'test',
        voice: data.voice,
        speed: data.speed
    };

    return cb(null, audioOpts);
}


var handleMessage = function handleMessage(msg) {
    parseMessage(msg, function(err, audioOpts) {
        if (err) console.error(err);

        // priorityQueue. 4 is priority level
        queue.push(audioOpts, 4, function(err) {
            if (err)
                console.error('error when adding to queue: %s', err);
            debug("all good in the neighborhood");
        });
    });
}


/**
 * connect to the MQ server
 */
module.exports.setup = function setup(host) {
    return amqp.connect(host)
        .then(function(conn) {
            var ok = conn.createChannel();
            ok = ok.then(function(ch) {
                var ex = 'd3vice';
                ch.assertQueue('')
                    .then(function(q) {
                        return Promise.all([
                            ch.assertExchange(ex, 'topic', {durable: false}),
                            ch.bindQueue(q.queue, ex, 'd3vice.pammy.all.#'),
                            ch.bindQueue(q.queue, ex, 'd3vice.pammy.' + process.env.D3VICE_GUID + '.#'),
                            ch.consume(q.queue, handleMessage)
                        ])
                    })
            });
            return ok;
        })
};
