// get command line arguments
var mode = process.argv[2]


// rabbitMQ is default mode
if (typeof mode === 'undefined' || mode == 'rabbitmq' || mode == 'mq') {
  require('./lib/mq');
}

// rest/express is alternate mode
else if (mode == 'express' || mode == 'rest') {
  require('./lib/rest');
}
