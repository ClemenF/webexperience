
var http = require('http')

const url = require('url')
const sq = require('querystring')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' +
'    <body>' +
'         <p>Hello World !</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = sq.parse(route.query);
  console.log(params);


  //const queryParams = sq.parse(url.parse(req.url).query);


  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(params.name);
  console.log(params.name);
  if(path === '/Hello' && params['name']) {
    res.write('Hello ' + params['name'])
  } else {
    res.write('Hello anonymous')
  }
  res.end();
}

const server = http.createServer(serverHandle);
server.listen(8081)
