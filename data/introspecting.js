function CommandLine() {
  this.containerDiv = document.body.appendChild(document.createElement('div'));
  this.containerDiv.setAttribute('id', 'introspect-command-line');
  this.cursus = this.containerDiv.appendChild(document.createElement('input'));
  this.cursus.value = 'noLoop();';
  this.cursus.autofocus = true;
  var runButton = this.containerDiv.appendChild(document.createElement('button'));
  runButton.setAttribute('id','run');
  runButton.textContent = 'Run';
  this.instanceNum = this.containerDiv.appendChild(document.createElement('select'));
  this.refreshInstances();
  // listeners
  runButton.addEventListener("click", function(){this.runCommand()}.bind(this), true);
  this.cursus.addEventListener("keypress", 
                               function(e){
                                 if(e.keyCode === 13) {
                                   this.runCommand();
                                   this.cursus.value = "";
                                 }
                               }.bind(this), 
                               true);
}

  
CommandLine.prototype = {
  runCommand: function() {
    if (Processing.instances.length < 1) {
      alert("Processing is loaded, but no sketches are registered with " +
            "the Processing.instances object. Prior to version 1.1, some " +
            "methods of loading sketches didn't register themselves. Loading " + 
            "errors can also cause this. Make sure you're using the latest " + 
            "version of Processing.js and double check your code for errors. " + 
            "If you're stumped, open the 'Web Console' from the tools menu " +
            "and reload the page. Look for errors in the console.");
      return; // bail
    }
    with(Processing.instances[parseInt(this.instanceNum.value)]) {
      try {
        eval(this.cursus.value);
      } catch (e) {
        Processing.logger.log("Introspecting error: " + e);
      }
    };
  },
  refreshInstances: function() {
    while (this.instanceNum.firstChild) {
      this.instanceNum.removeChild(firstChild);
    }    

    var opt = this.instanceNum.appendChild(document.createElement('option'));
    opt.setAttribute('value', '0');
    opt.textContent = 'Instance ID';
    for (var i = 0; i < Processing.instances.length; i++) {
      var opt = this.instanceNum.appendChild(document.createElement('option'));
      opt.setAttribute('value',i.toString());
      opt.textContent = i.toString();
      if (i === 0) {opt.selected = true;}
    }
    
    this.instanceNum.style.visibility = (Processing.instances.length < 2) ? 'hidden' : 'visible';
  }
}

var commandLine = new CommandLine();
window.addEventListener("load", function() {commandLine.refreshInstances()}, false);