let cenX = 0;
let cenY = 0;
let scale = 1;

function setup() {
  createCanvas(640, 360);
  pixelDensity(1);
  noStroke();
  colorMode(HSB);
}

function draw() {
  background(255);  // Clear the screen each frame
  
  // Redraw the fractal with the updated center (cenX, cenY) and scale
  drawBrot();
}

// This function draws the Mandelbrot set
function drawBrot() {
  loadPixels();  // Start loading pixels for the canvas

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = pixelToPoint(x, y);
      let result = calculatePoint(c);

      // Set pixel color based on whether it's inside the Mandelbrot set
      if (result.isIn) {
        set(x, y, color(0));  // Black for points inside
      } else if (result.i > 1) {
        set(x, y, color(
          150 + 200 - pow(result.i / (50), 0.5) * 200 % 255, 80, 100
        ));
      } else {
        set(x, y, color(50));  // Gray for points not yet diverging
      }
    }
  }

  updatePixels();  // Update the canvas with the new pixel data
}

// Map screen coordinates to complex plane
function pixelToPoint(x, y) {
  let p = createVector(
    (x - width / 2) * (4 / width) * (16 / (9 * scale)) + cenX,
    (y - height / 2) * (4 / height) * (1 / scale) + cenY
  );
  return p;
}

// Mandelbrot calculation for a given point
function calculatePoint(c) {
  let z0 = createVector(0, 0);
  let i = 0;
  let bounds = 30;
  let isIn = true;

  // Perform iterations to determine if the point escapes the set
  while (i < 50 && isIn) {
    z0 = createVector(
      z0.x * z0.x - z0.y * z0.y + c.x,
      2 * z0.x * z0.y + c.y
    );
    i++;

    if (z0.mag() > bounds) {
      isIn = false;
    }
  }

  return { 'i': i, 'isIn': isIn };
}

// Function to handle arrow key movement (up, down, left, right)
function keyPressed() {
  const moveSpeed = 0.1;

  if (keyCode === LEFT_ARROW) {
    cenX -= moveSpeed;  // Move left
  } else if (keyCode === RIGHT_ARROW) {
    cenX += moveSpeed;  // Move right
  } else if (keyCode === UP_ARROW) {
    cenY -= moveSpeed;  // Move up
  } else if (keyCode === DOWN_ARROW) {
    cenY += moveSpeed;  // Move down
  }

  redraw();  // Re-render the fractal after moving
}

// Function to handle mouse wheel zoom
function mouseWheel(event) {
  const zoomFactor = 1.1;

  // Zoom in or out based on mouse scroll direction
  if (event.delta > 0) {
    scale /= zoomFactor;  // Zoom out
  } else {
    scale *= zoomFactor;  // Zoom in
  }

  // Adjust center based on the mouse position to zoom into the mouse position
  let mouseXComplex = map(mouseX, 0, width, -2.5, 1.5);
  let mouseYComplex = map(mouseY, 0, height, -2, 2);

  cenX += (mouseXComplex - cenX) * (event.delta > 0 ? -0.05 : 0.05);
  cenY += (mouseYComplex - cenY) * (event.delta > 0 ? -0.05 : 0.05);

  redraw();  // Re-render the fractal after zooming
}
