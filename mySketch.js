//CC Attribution “Spinning cylinders” by Lisa Sekaida http://openprocessing.org/sketch/1742535
//License CreativeCommons Attribution NonCommercial ShareAlike https://creativecommons.org/licenses/by-nc-sa/3.0
//noprotect
let fInput;
var img = null
var img2 = null
let c 
let m = 3
let mainCanvas 
let graphicCanvas
let filename 
let loaded = false
let pixelsLoaded = false
let cSize = 20
let WIDTH 
let HEIGHT 
let positionArray = []
let autopaintThreshold = 50


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

	

	
if (img!=null&&img2!=null&&pixelsLoaded&&!loaded) {
	console.log("loaded")
	loaded = true
	//graphicCanvas.background(100)
	graphicCanvas.image(img, 0,0,graphicCanvas.width,graphicCanvas.height);
	
	
	
	fInput.hide()
	
	
	
	
	

clear()
	push()
	translate(0,0,-10)

	texture(graphicCanvas)
	//rotateX(Math.PI/2)
	plane(WIDTH,HEIGHT)
	pop()
	
	console.log("ArrayLength:" + positionArray.length)
	push()
	
	translate(-WIDTH/2>>0,-HEIGHT/2>>0,0)
	
	for(let i=0;i<positionArray.length;i++){
			
		 	push()
			//console.log("position Array: " + positionArray[i])
			translate(positionArray[i][0],positionArray[i][1],-10)
			rotateZ(Math.PI/64);
			rotateX(i * 0.001);
			fill(i*c[m][0]%255, i*c[m][1]%255, i*c[m][2]%255, 63);
			cylinder(cSize);
			pop()
	}
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
		img2 = createImage(WIDTH, HEIGHT)
		if (!pixelsLoaded) loadImage(file.data, img2 => { 
																	img2.resize(WIDTH,HEIGHT)
																	img2.loadPixels();
																 let index = 0

																	for (let i = 0; i < img2.width; i++) {
																		for (let j = 0; j < img2.height; j++) {
																			index = (i +j*img2.width)*4;
																			//console.log("pixels[index]: " +img2.pixels[index]) 
																			if (img2.pixels[index]<autopaintThreshold&&img2.pixels[index+1]<autopaintThreshold&&img2.pixels[index+2]<autopaintThreshold) positionArray.push([i,j])
																			
																		}
																	}
																	pixelsLoaded = true
																  console.log("pixels loaded") 
																 })
		
  } else {
    img = null;
		img2 = null
  }
}

//rotate brushes on mouse click
function mouseClicked() {
	m++
	m=m%4
}

function keyPressed(){
	if (key=="p") m=3
	if (key=="s") mainCanvas.get().save(filename, "png");
	if (key=="z") cSize = Math.max(8,cSize-5*random()>>0)
	if (key=="x") cSize = Math.min(90,cSize+5*random()>>0)
	return 0
}
