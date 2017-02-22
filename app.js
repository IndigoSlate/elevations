var express = require('express');
var body   = require('body-parser');
var config = require('./config');
var fs     = require('fs');

var app = express();

// accept large bodies
app.use(body.json({parameterLimit: 5000000, limit: '5000kb'}));
app.use(body.urlencoded({parameterLimit: 5000000, limit: '5000kb', extended: true}));

// api routes
app.use('/', require('./routes'));

// serve app
app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});