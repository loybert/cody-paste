'use strict';

var qrcode;
var sandbox;

function paste() {
  var result = '';
  sandbox.focus();
  if (document.execCommand('paste')) {
    result = sandbox.val();
  }
  return result;
}

$(document).ready(function() {
  sandbox = $('#sandbox');
  var code = paste();
  //console.log("pasting: " + code);
  qrcode = new QRCode("qrcode", {
    text: code,
    width: 300,
    height: 300,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.L
  });

  sandbox.on("blur", function () { refreshCode(); }).
    on('keyup', function(){ refreshCode(); }).
    on('change', function(){ refreshCode(); });
});



function refreshCode () {
  if (!sandbox.val()) {
    console.log("Input a text");
    qrcode.clear();
    sandbox.focus();
    return;
  }
  qrcode.makeCode(sandbox.val());
}
