// Node/npm deps
var express = require('express');
var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var GA = process.env.GA || '';
var VISUALIZE_SELF = process.env.VISUALIZE_SELF || false;


// Initialize app
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Expose static assets
app.use(express.static(__dirname + '/public', {redirect: false}));


/**
 * Main app URL. This page serves the visualization.
 */
app.get('/', function(req, res){
  cons.dust('views/index.dust', {
    GA: GA,
    VISUALIZE_SELF: VISUALIZE_SELF
  }, function (err, out) {
    if (err) {console.error(err); }
    res.send(out);
  });
});

/**
 * Listen for new visitors. We're using GET instead of sockets because it allows
 * the visualizer to be standalone, and you don't have to require socket.io as a
 * dependency on the site whose traffic is being tracked.
 */
app.get('/screen', function(req, res){
  var props = req.query;
  props = makeUnique(props);

  // Broadcast
  io.emit('add', props);
  console.log('🔷➕ ', JSON.stringify(props));
  res.sendStatus(200);
});


/**
 * Someone connected.
 */
io.on('connection', function(socket){
  // console.log('👥➕');

  /**
   * A new screen appears!
   */
  socket.on('add', function(props){
    props = makeUnique(props);
    io.emit('add', props);
    console.log('🔷 ', JSON.stringify(props));
  });

  /**
   * Someone got bored.
   */
  socket.on('disconnect', function(){
    // console.log('👥💨 ');
  });
});

/**
 * Listen for users to connect
 */
http.listen(port, function(){
  console.log('🔩 VISUALIZE_SELF:', process.env.VISUALIZE_SELF);
  console.log('⚡  Listening on port ' + port);
});

/**
 * Randomly generate a few properties of each screen.
 */
function makeUnique(props) {
  // Give the screen a random HTML ID and color.
  props.id = 'screen-' + Math.floor(Math.random() * 1000000000);
  props.backgroundColor = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';

  // Send back the new object.
  return props;
}
