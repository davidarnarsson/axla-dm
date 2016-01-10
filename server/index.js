var express = require('express');
var cors = require('cors');
var Gamedig = require('gamedig');
var path = require('path');
var serveStatic = require('serve-static');

var app = express(); 

app.use(cors());

var getServerInfo = (type, host, port, cb) => Gamedig.query({type: type, host: host, port: port}, cb);


app.use(serveStatic('../app', { index: 'index.html' }));

app.get('/api/servers/csgo/:ip', (req, res) => {
  var hostport = req.params.ip.split(':');
  var host = hostport[0];
  var port = 27015;
  console.log(hostport);
  if (hostport.length > 1) port = parseInt(hostport[1], 10);

  getServerInfo('csgo', host, port, (info) => {
    if (info && info.error) {
      return res.send({status: 'offline', ip: req.params.ip});
    }

    var server = {
      ip: req.params.ip,
      status: info.error ? 'offline' : 'online',
      current_map: info.map,
      port: info.query.port,
      game_mode: '',
      password_protected: info.password,
      name: info.name,
      current_players: info.raw.numplayers,
      max_players: info.maxplayers,
      players: info.players
    };

    res.send(server);

  })
});

app.get('/api/servers/ts3/:ip', (req, res) => getServerInfo('ts3', req.params.ip, info => {
  res.send(info)
}));

app.get('/api/servers/:type/:ip', (req, res) => getServerInfo(req.params.type, req.params.ip, info => {
  res.send(info)
}));

app.get('/api/servers/:type', (req, res) => {
  if (req.params.type == "csgo") {
    res.send([
      'dm.axlabond.in',
      '31.209.137.67',
      '31.209.137.67:27025',
      '5.23.79.122',
      '5.23.79.123',
      '5.23.79.124'
    ]);  
  } else if (req.params.type === "ts") {
    res.send([
      'axlabond.in',
      '1337.is:9987'
    ]);
  } else {
    res.status(404).send();
  }
});

app.listen(1337);
