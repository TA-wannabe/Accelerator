var limit = 4;

Level5.Light = function (params) {
  // if Light is instance of THREE.Line,
  // then we need calculate refraction etc. 
  // from custom renderer.

  this.waveLength = params.waveLength;
  this.startPoint = params.startPoint;
  this.direction = params.direction;
  this.direction.normalize();

};

Level5.Light.prototype.shoot = function (scene) {

  limit = limit - 1;

  Level5.Debug.drawHalfLine(scene, this.startPoint, this.direction);
  console.log(this.startPoint, this.direction);

  var objects = scene.children;
  var raycaster = new THREE.Raycaster(this.startPoint, this.direction);
  var intersections = raycaster.intersectObjects(objects, true);

  console.log(intersections);

  // find a collision point with face.
  var intersection = null;

  for (var key in intersections) {
    var collisionPoint = intersections[key].point;
    Level5.Debug.drawPoint(scene, collisionPoint);
    if (intersections[key].face !== null) {
      intersection = intersections[key];
      break;
    }
  }

  if (intersection === null) {
    return;
  }

  // reflection
  var collisionNormal = intersection.face.normal;

  var reflectionVector = this.direction.clone();
  reflectionVector.reflect(collisionNormal);
  reflectionVector.z = 0;
  reflectionVector.normalize();

  var collisionPoint2d = intersection.point.clone();
  collisionPoint2d.z = 0;

  console.log(reflectionVector, collisionPoint2d);

  var reflectedLight = new Level5.Light({
    waveLength: 430,
    startPoint: collisionPoint2d,
    direction: reflectionVector
  });

  reflectedLight.shoot(scene);
};