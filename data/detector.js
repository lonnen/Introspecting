// signal to the add-on script if Processing is defined
postMessage( (typeof Processing !== 'undefined') ? true : false );

// the content script will pass URL(s) to local plugin files
// that will be loaded
onMessage = function onMessage(message) {
  if (typeof message === 'string') {
    loadFile(message);
  } else {
    for (var i in message) {
      loadFile(message[i]);
    }
  }
}

// load a file into the document header
function loadFile(url) {
  var filetype = url.slice(url.lastIndexOf('.')+1);
  var head = document.getElementsByTagName('head');
  var element;
  if (filetype === 'js') {
    element = document.createElement('script');
    element.type = "text/javascript";
    element.src = url;
  } else if (filetype === 'css') {
    element = document.createElement('link');
    element.type = "text/css";
    element.rel = "stylesheet";
    element.href = url;
  }
  element = head[0].appendChild(element);
}
