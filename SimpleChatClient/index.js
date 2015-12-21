window.$ = require('jquery');
global.jQuery = $;
var setting = require('./setting').get();
var Util = require('./util');
var socket = require('socket.io-client')(setting.server);
var WindowsBalloon = require('node-notifier').WindowsBalloon;
var notifier = new WindowsBalloon({
  withFallback: false,
  customPath: void 0
});
var createNotification = function (title, message) {
  notifier.notify({
    title: title,
    message: message,
    sound: false,
    time: 20000,
    wait: true
  }, function (error, response) {
    console.log(response);

  });
  notifier.on('click', function (notifierObject, options) {
    window.focus();
  });
}
$(function () {
  $('#message').keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
      sendMessage()
    }
  });
  $('button').on('click', function () {
    sendMessage();
  });
  socket.once('log', function (data) {
    $('#log').append(data);
    window.scroll(0, $(document).height());
  });
  socket.on('msg', function (data) {
    recieveMessage(data);
  });
  $(window).on('scroll', function () {
    if ($('#space').hasClass('notice') && checkBottom()) {
      $('#space').removeClass('notice');
    }
  });
  socket.emit('add', setting.username);
  socket.on('add', function (data) {
    if (document.getElementById(data.id) == null) {
      $('#member').append($('<span class="label username" id="' + data.id + '">' + data.name + '</span>')
        .addClass(data.id == socket.id ? 'label-primary' : 'label-success'));
    }
  });
  socket.on('remove', function (id) {
    if (document.getElementById(id) != null) {
      $('#' + id).remove();
    }
  });

});
function sendMessage() {
  var message = $('#message').val();
  if (message && message != '') {
    message = message.replace(/\r\n/g, '<br>');
    message = message.replace(/(\n|\r)/g, '<br>');
    socket.emit('msg', setting.username + ' ： <br>' + message);
    $('#message').val('');
  }
}
function checkBottom() {
  return ($(window).height() + $(window).scrollTop()) == $(document).height();
}
function recieveMessage(data) {
  var isBottom = checkBottom();
  $("#log").append(data + '<p align="right" style="font-size:80%">' + Util.getDate() + '</p><hr>');
  if (isBottom) {
    window.scroll(0, $(document).height());
  } else {
    $('#space').addClass('notice');
  }
  createNotification('Simple Chat', data.replace('<br>', ' '));

}