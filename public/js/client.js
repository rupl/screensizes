'use strict';

var $ = function (selector) { return document.querySelector(selector); }
var socket = io();

/**
 * Add a new screen on all clients. It doesn't immediately add a shape to your
 * DOM, the 'add' listener below handles that part.
 */
window.onload = function() {
  socket.emit('add', {
    id: 'screen-' + Math.floor(Math.random() * 1000000000),
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')',
  });
};

/**
 * Listen for new screens and add them to DOM.
 */
socket.on('add', function(props) {
  // Create a new element
  var el = document.createElement('div');
  el.id = props.id;
  el.classList.add('screen');
  el.style.width = props.width + 'px';
  el.style.height = props.height + 'px';
  el.style.backgroundColor = props.backgroundColor;

  // Add the new element
  $('#canvas').appendChild(el);
});
