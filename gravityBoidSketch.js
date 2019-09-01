const flock = [];

function setup() {
  // put setup code here
  // createCanvas(windowWidth,windowHeight);
  createCanvas(500, 500);
  let numBoids = 100;
  for (let i = 0; i < numBoids; i++){
    flock.push(new boid);
  }
}

function draw() {

  // greyish black background
  background(51);
  

  // activate gravity well on mousepress
  if (mouseIsPressed) {
    gravitate(flock);
  }

 
  // build quadtree and insert all boids
  let qTree = new quadTree(new box(createVector(width/2,height/2),max(width,height)/2));  
  for (let boid of flock) {
    qTree.insertBoid(boid);
  }
  
  // handle the flock of boids
  for (let boid of flock) {

    let neighbors = qTree.boidQuery(boid);

    if (neighbors.length > 0) {
      boid.align(neighbors);    
      boid.cohere(neighbors); 
      boid.separate(neighbors);
    }
    boid.update();
    boid.show();
  }  
}


function gravitate(flock) {
  let gravScalar = 0.01;


  for (let boid of flock) {
    let radius = createVector(mouseX,mouseY);
    radius.sub(boid.position);
    radius.mult(gravScalar);
    let invSqDist = pow(radius.magSq(),-1);
    radius.mult(invSqDist);    

    boid.acceleration.add(radius);
  }
}