const self = require("self");
const pageMod = require("page-mod");

// if processing is detected, feed the page URLs of plug-in resources to load
let detector = pageMod.PageMod({
  include: ["*"], // all pages
  contentScriptWhen: 'ready',
  contentScriptFile: [self.data.url("detector.js")],
  onAttach: function onAttach(worker) {
    worker.on('message', function(hasProcessing){
      if (hasProcessing) {
        this.postMessage([self.data.url('introspecting.js'),
                          self.data.url('bespin.js'),
                          self.data.url('css/introspecting.css'),
                          self.data.url('css/bespin.css'),
                          self.data.url('css/ide.css')]);
      }
    });
  }  
});