const self = require("self");
const pageMod = require("page-mod");

let detector = pageMod.PageMod({
  include: ["*"], // all pages
  contentScriptWhen: 'ready',
  contentScriptURL: self.data.url("detector.js"),
  onAttach: function onAttach(worker) {
    console.log("Attaching content scripts")
    worker.on('message', function(data) {
      console.log(data);
    });
  }
});