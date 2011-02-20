const self = require("self");
const pageMod = require("page-mod");

let detector = pageMod.PageMod({
  include: ["*"], // all pages
  contentScriptWhen: 'ready',
  contentScriptFile: [self.data.url("detector.js")],
  onAttach: function onAttach(worker) {
    worker.on('message', function(hasProcessing){
      if (hasProcessing) {
        this.postMessage([self.data.url('introspecting.js'), self.data.url('css/introspecting.css')])
      }
    });
  }  
});