var player = require('./player');
var queue = require('./localQueue');
var amqp = require('amqplib/callback_api');
var debug = require('debug')('d3vice:pammy');


amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'd3vice';
        ch.assertExchange(ex, 'topic', {
            durable: false
        });
        ch.assertQueue('', {
            durable: false
        }, function(err, q) {
            console.log(
              " [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

            ch.bindQueue(q.queue, ex, 'd3vice.pammy.tts');

            ch.consume(q.queue, function(msg) {
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

                var audioOpts = {
                    type: data.type,
                    path: data.path,
                    text: data.text || 'test',
                    voice: data.voice,
                    speed: data.speed
                };

                // priorityQueue. 4 is priority level
                queue.push(audioOpts, 4, function(err) {
                    if (err)
                        console.error('error when adding to queue: %s', err);
                    debug("all good in the neighborhood");
                });

            }, {
                noAck: true
            });
        });
    });
});