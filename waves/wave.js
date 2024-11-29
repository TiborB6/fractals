// Variables to control the wave fractal
let angle = 0;
let amplitude = 100;
let frequency = 0.1;
let waveCount = 10;
let timeOffset = 0; 
let clickX = -1; 
let clickY = -1; 

function setup() {
  createCanvas(600, 400);
  noFill();
}

function draw() {
  background(0);
  

  angle += 0.005;  
  
  timeOffset += 0.01;  
  
  // Change color based on time
  let r = map(sin(timeOffset), -1, 1, 100, 255);  
  let g = map(cos(timeOffset), -1, 1, 100, 255);  
  let b = map(sin(timeOffset + PI / 2), -1, 1, 100, 255);  
  stroke(r, g, b);
  
  // fractal wave drawing
  for (let i = 0; i < waveCount; i++) {
    let offset = i * 10; 
    drawWave(width / 2, height / 2, amplitude, frequency, offset, angle, 0);  // Start at depth 0
  }
}

// Function to draw a wave fractal with depth-based coloring
function drawWave(x, y, amp, freq, offset, angle, depth) {
  beginShape();
  for (let t = -PI; t < PI; t += 0.1) {
    // wave sin
    let xPos = x + t * 100;
    let yPos = y + sin(t * freq + angle + offset) * amp;
    
    // mausdruck
    if (mouseIsPressed) {
      let distToClick = dist(xPos, yPos, mouseX, mouseY);
      let maxDist = 200; 
      let pressEffect = map(distToClick, 0, maxDist, 1.5, 0.5); 
      yPos += sin(distToClick * 0.05) * amp * pressEffect; 
    }
    
    // Color based on depth
    let depthColor = map(depth, 0, 10, 50, 255);  
    stroke(depthColor, 255 - depthColor, 255);
    
    vertex(xPos, yPos);
  }
  endShape();
  
  // Make each wave smaller as we go deeper (fractal effect)
  if (amp > 10) {
    drawWave(x, y, amp * 0.7, freq, offset + 20, angle, depth + 1);  // Increase depth
  }
}
