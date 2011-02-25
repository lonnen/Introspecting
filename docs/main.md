Introspecting is a tool to assist with Processing.js development
================================================================

When installed and active, the addon will look for a Processing object on every page loaded in the
browser. When Processing is loaded on a page, a semi-transparent black bar will load at the top of 
the page that can be used like a console. It defaults to modifying the first sketch registered with 
the Processing.instances array, but will present a selector box if more than one instance is 
present. If there are no instances, it will alert you that there has been some sort of problem. As 
of Processing.js 1.1 all sketches should register themselves with Processing.instances on creation.

The console is restricted to a single line, and accepts JavaScript to execute in the context of the
Processing instance. This gives you access to Processing and sketch fuctions. Errors will be output 
to the standard tinyLog, prepended with 'Introspecting error:', and should not catastrophically 
interrupt the flow if the sketch. 

If anything does go terribly wrong, a page refresh will reset everything.

At the moment the fake command line keeps no buffer and has no history, but you can use the undo
and redo commands in the browser to simulate it (poorly).

LiveCoding
==========

The console can be used for live codeing. Try the following series of lines to get started:

> draw = function(){ background(0); ellipse(mouseX, mouseY, pmouseX, pmouseY); }
> stroke(200, 200, 0)

This should black out the sketch and create an ellipse that deforms and follows the mouse around
the screen.