// GLOBAL OBJECTS/DATA STRUCTURES

var g = 1;
var j = 0;
var jumps = 0;
var playerImg = new Image();
playerImg.src = 'Assets/PlatformerCharL.png';
var introImg = new Image();
introImg.src = 'Assets/Intro.png';
var skeletonImg = new Image();
skeletonImg.src = 'Assets/PlatformerSkeletonL.png';
var groundHeight = canvasH - 82;
frame.strokeStyle = "#ffffff";
frame.fillStyle = "#ffffff";
var enter = document.getElementById("enter");
var formula;
var right = false;
var left = false;
var down = false;
var jumped = false;
var invert = false;
var shift = false;
var speedUp = false;
var slowDown = false;
var pause = true;
var FPS = 60;
var player = {"x": canvasW/2 - 13.5, "y": -80, "xV": 0, "yV": 0, "width": 27, "height": 80, "direction": "right", "HP": 25};
var projectile = function() { 
    this.x = player.x + player.width/2; 
    this.y =  player.y + player.height/2; 
    this.speed = 8; 
    this.xV = null; 
    this.yV = null; 
    this.damage = 1;
}
var projectileArray = [];
var rectangle = function() { 
    this.x = null; 
    this.y =  null; 
    this.w = null; 
    this.h = null; 
    this.foreground = true; 
    this.color = "#ffffff"; 
    this.key = false; 
    this.keyNum = null;
}
var rectangleArray = [];
var skeleton = function() { 
    this.x = null; 
    this.y =  null; 
    this.speed = 5; this.damage = 5; this.w = 27; this.h = 80; this.direction = "left"; this.HP = 40;
}
var skeletonArray = [];
var keyList = [false, false, false, false, false];
var img = function() {
    this.x = null; 
    this.y =  null; 
    this.src; 
    this.foreground = true;
}
var imgArray = [];
var level = function(){
    this.id = 0;
    //this.
}