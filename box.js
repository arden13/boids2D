class box {
     constructor(centerVect, halfDim) {
          this.center = centerVect;
          this.halfDim = halfDim;
          this.color = [255, 255, 255];
     }

     // determines whether a circle intersects the box
     circleIntersect(centerVector,radius) {

          // test four corner points to center
          let clockPointer = createVector(this.halfDim,this.halfDim);
          let angleToRot = HALF_PI;
          for (let i = 0; i < 4; i++) {
               // create new CenterVector & rotate by an angle
               let boxCenterVect = p5.Vector.add(this.center);
               boxCenterVect.add(clockPointer.rotate(angleToRot*i));

               // subtract the centerVector and calc distance
               boxCenterVect.sub(centerVector);
               let distance = boxCenterVect.mag();
               if (distance < radius) {
                    return true;
               }
          }

          return this.boxIntersect(new box(centerVector,radius));
     }


     // determines whether the point is in the box
     containsPoint(pointVector) {

          // check x-dim, return false if outside
          if (pointVector.x < this.center.x - this.halfDim
                    || pointVector.x > this.center.x + this.halfDim) {
               return false;

          // check y-dim, return false if outside
          } else if (pointVector.y < this.center.y - this.halfDim
                    || pointVector.y > this.center.y + this.halfDim) {
               return false;

          // else, return true
          } else {
               return true;
          }
     }

     // determines whether a box intersects another box
     boxIntersect(box) {

          // check x-dim box left edge vs. this right edge
          // return false if outside
          if (box.center.x - box.halfDim >= this.center.x + this.halfDim) {
               return false;

          // check x-dim box right edge vs. this left edge
          // return false if outside
          } else if (box.center.x + box.halfDim <= this.center.x - this.halfDim) {
               return false;

          // check y-dim box top edge vs. this bottom edge
          // return false if outside
          } else if (box.center.y - box.halfDim >= this.center.y + this.halfDim) {
               return false;

          // check y-dim box bottom edge vs. this top edge
          // return false if outside
          } else if (box.center.y + box.halfDim <= this.center.y - this.halfDim) {
               return false;

          //  otherwise return true
          } else {
               return true;
          }
     }

     show() {
          rectMode(RADIUS);
          noFill();
          stroke(this.color);
          strokeWeight(1);
          rect(this.center.x,this.center.y,this.halfDim,this.halfDim);
     }
}