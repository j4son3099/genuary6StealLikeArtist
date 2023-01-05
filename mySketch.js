//CC Attribution “Spinning cylinders” by Lisa Sekaida http://openprocessing.org/sketch/1742535
//License CreativeCommons Attribution NonCommercial ShareAlike https://creativecommons.org/licenses/by-nc-sa/3.0

let fInput;
var img = null
var img2 = null
let c 
let m = 3
let mainCanvas 
let graphicCanvas
let filename 
let loaded = false
let cSize = 20
let WIDTH 
let HEIGHT 
let positionArray = []


function preload(){
	
	fInput = createFileInput(handleFile);
	fInput.position(0, 0);
}

function setup() {

filename = "RGBPaint" + (random(999)>>0).toString()
WIDTH = windowWidth 
HEIGHT = windowHeight
mainCanvas = createCanvas(WIDTH, HEIGHT, WEBGL);
graphicCanvas = createGraphics(WIDTH,HEIGHT)
frameRate(200)
noStroke();
let cOrange = [255,101,31]
let cBlue = [31,81,255]
let cPink = [255,16,240]
c = [cOrange,cBlue,cPink]
//background(255)
//graphicCanvas.background(0)
}


//shape from "Spinning Cylinders" by Lisa Sekaida
function draw() {
	orbitControl()
	if (!loaded) clear()

	

	
if (img!=null&&img2!=null&&!loaded) {
	console.log("loaded")
	loaded = true
	//graphicCanvas.background(100)
	graphicCanvas.image(img, 0,0,graphicCanvas.width,graphicCanvas.height);
	
	
	
	fInput.hide()
	
	
	img2.loadPixels();
	let index = 0
	for (let i = 0; i < img.width; i++) {
		for (let j = 0; j < img.height; j++) {
			if (img2.pixels[index]+img2.pixels[index+1]+img2.pixels[index+2]<50) positionArray.push([i,j]) 
			index=index+4
		}
	}
	
	
	for(let i=0;i<positionArray.length;i++){
		 	push()
			translate(positionArray[i][0],positionArray[i][1],0)
			rotateZ(PI/64);
			rotateX(frameCount * 0.001);
			fill(i*c[m][0], i* c[m][1], i*c[m][2], 63);
			cylinder(cSize);
			pop()
	}
	

clear()
	push()
	translate(0,0,-500)

	texture(graphicCanvas)
	//rotateX(Math.PI/2)
	plane(WIDTH,HEIGHT)
	pop()
}

translate(mouseX-windowWidth/2>>0,mouseY-windowHeight/2>>0,0)
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
    img = createImg(file.data, "");
		img.hide()
		img2 = loadImage(file.data)
  } else {
    img = null;
		img2 = null
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
