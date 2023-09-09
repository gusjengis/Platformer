// SETUP

var body = document.getElementById("body");
var display = document.getElementById("display");
canvasW = 2535;
canvasH = 1410;
display.width = canvasW;
display.height = canvasH;
document.body.style.zoom = document.documentElement.clientWidth/canvasW;
document.body.style.zoom = document.body.style.zoom+0.1;
var frame = display.getContext("2d");