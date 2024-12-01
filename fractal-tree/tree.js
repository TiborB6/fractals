var angle
var slider
count = 0;

function setup() { 
  createCanvas(500, 500);
  slider = createSlider(0, 2 * PI, PI / 4, 0.01) //slider (ranges from 0 - 2 * PI)
  slider.position(10, height);
} 

function draw() { 
  background(220);
  angle = slider.value(); //get angle value from slider
  translate(width/2, height); //start tree at bottom
  branch(100); //inital branch length
  
}

function branch(len) {
    line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 10) { //if branch length is greater than 5, create new branches
  push(); //save current state
  rotate(angle);
  branch(len * 0.7) // Recursively draw the right branch
  pop(); //restore previous state

  push(); //save current state
  rotate(-angle);
  branch(len * 0.75) // Recursively draw the left branch
  pop();  //save current state
  }else { // Add circles at the end of branches
    fill(34, 139, 34); // Constant leaf color (forest green)
    noStroke();
    ellipse(0, 0, 10, 10);
    count++;
    if (count % 3 == 0){
      fill(144, 173, 112); // Constant leaf color  (greenish)
      noStroke();
      ellipse(0, 0, 10, 10);
    } else if (count % 4 == 0){
      fill(210, 201, 109); // Constant leaf color (yellowish)
      noStroke();
      ellipse(0, 0, 10, 10);
  }
  }
}