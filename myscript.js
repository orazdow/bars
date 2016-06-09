
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bars = [];
var real;
var imag;

initBars();

function initBars() {
var num = document.getElementById('num').value;
bars = [];
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
for(var i = 0; i < num; i++){
 bars[i] = new Bar(10+i*10, canvas.height, 5, 100);
 bars[i].update();
 } 
 ctx.closePath(); 
 real = new Float32Array(bars.length+1);
 imag = new Float32Array(bars.length+1);
}

function Bar(x, y, w, h){	
this.x = x;
this.y = y;
this.w = w;
this.h = h;
this.y -= this.h;

this.update = function() {
ctx.rect(this.x, this.y, this.w, this.h);
ctx.stroke();
}  

this.checkMouse = function(x,y) { 
 if(x >= this.x && x <= this.x + this.w){
 this.y = y; this.h = canvas.height-y; 
 }	
} 
}  

function getMouse(event) {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 for(var i = 0; i < bars.length; i++){
   bars[i].checkMouse(event.offsetX, event.offsetY); 
   bars[i].update(); 
 } 
ctx.closePath(); 
resetWave(real);
}

function resetWave(arr) { 
 for(var i = 1; i < arr.length; i++){
 arr[i] = Math.pow(bars[i-1].h / canvas.height, 2); }
 wave = context.createPeriodicWave(real, imag);
 osc.setPeriodicWave(wave);
}

function clearBars() { 
 var lev = 0;
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 for(var i = 0; i < bars.length; i++){ 
 bars[i].h =  lev; bars[i].y = canvas.height - lev; bars[i].update();  }
 ctx.closePath();
 resetWave(real);  
}

function randomBars () {
 var lev = 10;
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 for(var i = 0; i < bars.length; i++){ lev = Math.pow(Math.random(),3)*60;
 bars[i].h =  lev; bars[i].y = canvas.height - lev; bars[i].update();  }
 ctx.closePath();
 resetWave(real); 
}

function getFreq (input) {
 osc.frequency.value = input.value;
} 

var context = new AudioContext();
var output = context.createGain();
output.connect(context.destination);


var wave = context.createPeriodicWave(real, imag);
var osc = context.createOscillator();
osc.setPeriodicWave(wave);

osc.frequency.value = 50;
osc.start();
osc.connect(output);

