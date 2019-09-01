class boid {
     constructor() {
          // initialize position as vector
          this.position = createVector(random(width), random(height));

          // initialize velocity as vector and give it a random magnitude
          this.velocity = p5.Vector.random2D();          
          this.velocity.setMag(random(0.5, 3));

          // initialize acceleration as empty vector
          this.acceleration = createVector();

          // give a perception Radius
          this.perceptionRadius = 100;

          // set max speed
          this.maxSpeed = random(2.8,3.2);    

          // set drawing properties
          this.width = 7;
          this.length = 15;
          this.color = [255, 255, 255];
     }

     findNeighbors(flock){// Find all neighbors in the flock
          // initialize neighbors array
          var neighbors = [];

          // for all boids in flock
          for (let flockBoid of flock) {

               // if the flockBoid isn't this boid
               if (this != flockBoid) {

                    //calculate the distance
                    let distance = dist(this.position.x, this.position.y, flockBoid.position.x, flockBoid.position.y);

                    //store it in the neighbors if the 
                    if (distance <= this.perceptionRadius) {
                         neighbors.push(flockBoid);
                    }
               }
          }
          // return the array of neighbors
          return neighbors;
     }

     // separation function
     separate(neighbors) {

          // modify accel squishiness
          let accelerationScalar = 0.05;

          // initialize force vector
          let separationForce = createVector();

          // for all neighbors, calc separation force proportional to 1/r
          for (let otherBoid of neighbors) {
               let distance = p5.Vector.sub(this.position,otherBoid.position);
               let magnitude = distance.mag();
               distance.mult(pow(magnitude,-1)); 
               separationForce.add(distance);          
          }
      
          // squishify acceleration and store
          separationForce.mult(accelerationScalar);          
          this.acceleration.add(separationForce);
     }


     // cohesion function
     cohere(neighbors) {

          // modify acceleration squishiness
          let accelerationScalar = 0.01;

          // initialize center of Mass
          let centerOfMass = createVector();

          // loop over neighbors, add position
          for (let otherBoid of neighbors) {
               centerOfMass.add(otherBoid.position);
          }

          // divide to get mean position
          centerOfMass.div(neighbors.length);

          // subtract current position to get difference vector
          centerOfMass.sub(this.position);

          // squishify and store
          centerOfMass.mult(accelerationScalar);          
          this.acceleration.add(centerOfMass);
     }

     // alignment function
     align(neighbors) {

          // scalar to modify the acceleration squishiness
          let accelerationScalar = 0.1;

          // preallocate average vector
          let avgDirection = createVector();

          // add velocities of all neighbors together
          for (let otherBoid of neighbors) {
               avgDirection.add(otherBoid.velocity);
          }

          // divide to get mean
          avgDirection.div(neighbors.length);

          // squishify and store
          avgDirection.mult(accelerationScalar)
          this.acceleration.add(avgDirection)          
     }

     // update function
     update() {

          // add velocity to position
          this.position.add(this.velocity);

          // add acceleration to velocity and limit to max
          this.velocity.add(this.acceleration);    
          this.velocity.limit(this.maxSpeed);

          // clear acceleration
          this.acceleration.mult(0);

          // if the boid is at a left/right edge, transport to other
          if (this.position.x < 0) {
               this.position.x = width;
          } else if (this.position.x > width) {
               this.position.x = 0;
          }
          
          // if the boid is at a top/bottom edge, transport to other
          if (this.position.y < 0) {
               this.position.y = height;
          } else if (this.position.y > height) {
               this.position.y = 0;
          }
     }

     // function to plot a line from one vector to another with a scalar
     plotVector(vector1,vector2,scalar) {
          line(vector1.x,vector1.y,vector1.x+scalar*vector2.x,vector1.y+scalar*vector2.y);
     }



     // draw function for boids
     show() {

          // save rotation/translation state
          push();

          // calc theta between 0,0 and velocity
          let theta = atan2(this.velocity.x,this.velocity.y);

          //translate to position
          translate(this.position.x,this.position.y);

          // rotate by -theta and draw triangle
          rotate(-theta);
          triangle(0,0,
               this.width/2, -this.length,           
               -this.width/2, -this.length);

          // return to rotation/translate state
          pop();

          // simple pseudotriangle wtih no push/pop
          // strokeWeight(1);
          // stroke(this.color[0],this.color[1],this.color[2]);
          // let edgeSticks = createVector();
          // let edgeStickAngle = PI/16;          
          // edgeSticks.add(this.velocity);
          // edgeSticks.setMag(1);
          // edgeSticks.mult(-1);
          
          // edgeSticks.rotate(edgeStickAngle);          
          // this.plotVector(this.position, edgeSticks,this.length);          
          // edgeSticks.rotate(-2*edgeStickAngle);
          // this.plotVector(this.position, edgeSticks,this.length);
     }

}