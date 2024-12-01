let angle = 0;
let amplitude = 100;
let frequency = 0.1;
let waveCount = 3;
let timeOffset = 0;
let maxDepth = 5; // Control recursion depth to limit waves
let r, g, b; // Color variables

function setup() {
  createCanvas(600, 400);
  noFill();
  
  // Call the animation loop manually
  frameRate(60); // Set the frame rate
  animate();
}

function animate() {
  // Clear the background
  background(0);

  angle += 0.005;
  timeOffset += 0.01;

  // Update color over time
  r = map(sin(timeOffset), -1, 1, 100, 255);
  g = map(cos(timeOffset), -1, 1, 100, 255);
  b = map(sin(timeOffset + PI / 2), -1, 1, 100, 255);
  stroke(r, g, b);

  // Fractal wave drawing
  for (let i = 0; i < waveCount; i++) {
    let offset = i * 10;
    drawWave(width / 2, height / 2, amplitude, frequency, offset, angle, 0); // Start at depth 0
  }

  // Call animate again for the next frame
  requestAnimationFrame(animate);
}

// Function to draw a wave fractal with depth-based coloring and limiting recursion
function drawWave(x, y, amp, freq, offset, angle, depth) {
  if (depth > maxDepth) return; // Stop recursion after reaching the max depth

  beginShape();
  for (let t = -PI; t < PI; t += 0.1) {
    // Wave sine calculation
    let xPos = x + t * 100;
    let yPos = y + sin(t * freq + angle + offset) * amp;

    // Repulsion effect when mouse is pressed
    if (mouseIsPressed) {
      let distToMouse = dist(xPos, yPos, mouseX, mouseY);
      let maxDist = 300; // Radius of the repulsion effect
      if (distToMouse < maxDist) {
        let repulsionForce = map(distToMouse, 0, maxDist, 20, 0); // Stronger repulsion when closer
        let angleToMouse = atan2(yPos - mouseY, xPos - mouseX);
        xPos += cos(angleToMouse) * repulsionForce;
        yPos += sin(angleToMouse) * repulsionForce;
      }
    }

    // Color based on depth
    let depthColor = map(depth, 0, maxDepth, 50, 255);
    stroke(depthColor, 255 - depthColor, 255);

    vertex(xPos, yPos);
  }
  endShape();

  // Make each wave smaller as we go deeper (fractal effect)
  drawWave(x, y, amp * 0.7, freq, offset + 20, angle, depth + 1); // Increase depth
}
