window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  function updateUIText(elementId, text) {
    document.getElementById(elementId).textContent = text;
  }

  function onPeerFoundHandler(event) {
    updateUIText('status', 'Got NFC Peer!');
    var request = event.peer.sendNDEF([record]);
    request.onsuccess = () => updateUIText('sent', 'Thanks for sharing!');
    request.onerror = () => updateUIText('sent', 'Sharing failed.');
  }

  function onPeerLostHandler() {
    updateUIText('status', 'NFC Peer went away.');
    setTimeout(() => updateUIText('status', ''), 10000);
  }

  var nfcUtils = new NfcUtils();
  var tnf = NDEF.TNF_WELL_KNOWN;
  var type = NDEF.RTD_URI;
  var url = nfcUtils.fromUTF8('\u0003thecatapi.com/api/images/get?format=src&type=gif');
  var record = new MozNDEFRecord({tnf:tnf, type:type, payload:url});

  if (navigator.mozNfc) {
    navigator.mozNfc.onpeerfound = onPeerFoundHandler;
    navigator.mozNfc.onpeerlost = onPeerLostHandler;
  } else {
    updateUIText('status','Your device does not support nfc.');
  }
});
