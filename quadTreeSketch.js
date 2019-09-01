const field = [];

function setup() {
  // put setup code here
  createCanvas(500,500);
  let numPoints = 1000;
  for (i = 0; i < numPoints; i++) {
    field.push(createVector(random(0,width),random(0,height)));
  }
}

function draw() {
  // put drawing code here
  background(51);

  let qTree = new quadTree(new box(createVector(width/2,height/2),width/2));
  
  stroke(255);
  strokeWeight(4);
  for (vect of field) {
    qTree.insertPoint(vect);
    point(vect.x,vect.y);
  }


  // let boxWidth = 40;
  // let mouseBox = new box(createVector(mouseX,mouseY),boxWidth);

  // mouseBox.color = [0, 255, 0];

  // let pointsInBox = qTree.boxQuery(mouseBox);

  // mouseBox.show();
  // stroke(mouseBox.color);
  // strokeWeight(10);

  // for (vect of pointsInBox) {
  //   point(vect.x,vect.y);
  // }
  let colorToShow = [0, 255, 0];
  stroke(colorToShow);
  strokeWeight(1);
  noFill();
  let circleRadius = 40;

  circle(mouseX,mouseY,2*circleRadius);

  let mouseCenterVect = createVector(mouseX,mouseY);

  let pointsInCirc = qTree.circleQuery(mouseCenterVect,circleRadius);


  strokeWeight(10);

  for (vect of pointsInCirc) {
    point(vect.x,vect.y);
  }
  
}