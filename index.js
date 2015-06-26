// Node/npm deps
var express = require('express');
var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var GA = process.env.GA || '';


// Initialize app
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Expose static assets
app.use(express.static(__dirname + '/public', {redirect: false}));


// Main app URL
app.get('/', function(req, res){
  cons.dust('views/index.dust', {
    GA: GA
  }, function (err, out) {
    if (err) {console.error(err); }
    res.send(out);
  });
});

/**
 * Someone connected.
 */
io.on('connection', function(socket){
  console.log('user: connected');

  /**
   * A new screen appears!
   */
  socket.on('add', function(props){
    console.log('ADD', props);
    io.emit('add', props);
  });

  /**
   * Someone got bored.
   */
  socket.on('disconnect', function(){
    console.log('user: disconnected');
    io.emit('status', 'someone left');
  });
});

/**
 * Listen for users to connect
 */
http.listen(port, function(){
  console.log('Listening on port ' + port);
});
