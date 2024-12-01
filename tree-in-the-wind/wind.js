var angle;
var slider;
var count = 0;
let amplitude = 100;
let frequency = 0.1;
let waveCount = 3;
let timeOffset = 0;
let maxDepth = 5; // Control recursion depth to limit waves
let r, g, b; // Color variables

let treeRadius = 150; // Define the radius around the tree to avoid waves

function setup() { 
  createCanvas(600, 600);
  slider = createSlider(0, 2 * PI, PI / 4, 0.01); // Angle slider
  slider.position(10, height - 30);
  noFill();
  frameRate(60); // Set frame rate for smooth animation
} 

function draw() { 
  background(0); // Dark background for contrast

  // Animated wave in the background
  timeOffset += 0.01;
  r = map(sin(timeOffset), -1, 1, 100, 255);
  g = map(cos(timeOffset), -1, 1, 100, 255);
  b = map(sin(timeOffset + PI / 2), -1, 1, 100, 255);
  stroke(r, g, b);

  // Fractal wave drawing in the background
  for (let i = 0; i < waveCount; i++) {
    let offset = i * 10;
    drawWave(width / 2, height / 2 + 50, amplitude, frequency, offset, timeOffset, 0); // Draw waves with depth 0
  }

  // Fractal tree with slider-controlled angle
  angle = slider.value(); // Get angle from slider
  translate(width / 2, height); // Move origin to the bottom of the canvas
  branch(100); // Initial branch length
}

function branch(len) {
    stroke(255)
  line(0, 0, 0, -len); // Draw the current branch
  translate(0, -len); // Move to the end of the branch
  if (len > 10) { // If the branch length is greater than a threshold, create new branches
    push(); // Save the current state
    rotate(angle);
    branch(len * 0.7); // Recursively draw the right branch
    pop(); // Restore previous state

    push(); // Save the current state
    rotate(-angle);
    branch(len * 0.75); // Recursively draw the left branch
    pop(); // Restore previous state
  } else { // Add leaves at the end of the branches
    fill(34, 139, 34); // Forest green for leaves
    noStroke();
    ellipse(0, 0, 10, 10); // Draw leaf
    count++;
    if (count % 3 == 0) {
      fill(144, 173, 112); // Greenish leaf color
      noStroke();
      ellipse(0, 0, 10, 10); // Draw leaf
    } else if (count % 4 == 0) {
      fill(210, 201, 109); // Yellowish leaf color
      noStroke();
      ellipse(0, 0, 10, 10); // Draw leaf
    }
  }
}

// Function to draw a wave fractal with depth-based coloring and limiting recursion
function drawWave(x, y, amp, freq, offset, angle, depth) {
  if (depth > maxDepth) return; // Stop recursion after reaching max depth

  beginShape();
  for (let t = -PI; t < PI; t += 0.1) {
    let xPos = x + t * 100;
    let yPos = y + sin(t * freq + angle + offset) * amp;
    
    // Avoid wave interaction with the tree area (avoid within a certain radius)
    let distToTreeCenter = dist(xPos, yPos, width / 2, height);
    if (distToTreeCenter < treeRadius) {
      continue; // Skip drawing waves in this region
    }

    // Color based on depth
    let depthColor = map(depth, 0, maxDepth, 50, 255);
    stroke(depthColor, 255 - depthColor, 255); // Color gradient for waves

    vertex(xPos, yPos);
  }
  endShape();

  // Make each wave smaller as we go deeper (fractal effect)
  drawWave(x, y, amp * 0.7, freq, offset + 20, angle, depth + 1); // Increase depth
}
