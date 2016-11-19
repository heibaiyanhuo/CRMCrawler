var server = require('connect')


server.createServer(server.static(__dirname)).listen(3000);

console.log('Server is starting...')