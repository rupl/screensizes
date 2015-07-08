'use strict';

var $ = function (selector) { return document.querySelector(selector); }
var socket = io();

/**
 * Listen for new screens and add them to DOM.
 */
socket.on('add', function(props) {
  // Create a new element
  var el = document.createElement('div');
  el.id = props.id;
  el.classList.add('screen');
  el.style.width = props.w + 'px';
  el.style.height = props.h + 'px';
  el.style.backgroundColor = props.backgroundColor;

  // Add the new element
  $('#canvas').appendChild(el);
});

/**
 * More info.
 */
$('.huh').addEventListener('click', function(event) {
  $('#more-info').classList.toggle('showing');
});

/**
 * Allow keyboard toggle of more-info too using Shift+?
 */
document.addEventListener('keyup', function(event) {
  if(event.shiftKey && event.keyCode == 191) {
    $('#more-info').classList.toggle('showing');
  }
});
