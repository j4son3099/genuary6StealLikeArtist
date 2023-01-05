//CC Attribution “Spinning cylinders” by Lisa Sekaida http://openprocessing.org/sketch/1742535
//License CreativeCommons Attribution NonCommercial ShareAlike https://creativecommons.org/licenses/by-nc-sa/3.0

let fInput;
let img;
let c 
let m = 3
let mainCanvas 
let filename 
let loaded = false
let cSize = 20
let WIDTH 
let HEIGHT 


function preload(){
	fInput = createFileInput(handleFile);
	fInput.position(0, 0);
}

function setup() {

filename = "RGBPaint" + (random(999)>>0).toString()
WIDTH = windowWidth 
HEIGHT = windowHeight
mainCanvas = createCanvas(WIDTH, HEIGHT, WEBGL);
frameRate(200)
noStroke();
let cRed = [35,2,2]
let cGreen = [2,35,2]
let cBlue = [2,2,35]
c = [cRed,cGreen,cBlue]
background(255)

}


//shape from "Spinning Cylinders" by Lisa Sekaida
function draw() {
translate(mouseX-windowWidth/2>>0,mouseY-windowHeight/2>>0,0)
if (!loaded&&img) {
	push()
	image(img, -WIDTH/3>>0, -HEIGHT/3>>0, WIDTH, HEIGHT);
	loaded = true
	fInput.hide()
	pop()
	}


if (m<3){
	for (let i = 0; i < 10; i++) {
	rotateZ(PI/64);
	rotateX(frameCount * 0.001);
	fill(i*c[m][0], i* c[m][1], i*c[m][2], 63);
	cylinder(cSize);
	}
}



}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

//rotate brushes on mouse click
function mouseClicked() {
	m++
	m=m%3
}

function keyPressed(){
	if (key=="p") m=3
	if (key=="s") mainCanvas.get().save(filename, "png");
	if (key=="z") cSize = Math.max(8,cSize-5*random()>>0)
	if (key=="x") cSize = Math.min(90,cSize+5*random()>>0)
}
