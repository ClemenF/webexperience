
var http = require('http')

const handles = require('./module');

const server = http.createServer(handles.serverHandle);
server.listen(8081)
