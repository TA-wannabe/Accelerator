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

  Level5.Debug.drawHalfLine(scene, this.startPoint, this.direction);

  var objects = scene.children;
  var raycaster = new THREE.Raycaster(this.startPoint, this.direction);
  var intersections = raycaster.intersectObjects(objects, true);

  var intersection = intersections[0];

  console.log(intersections);

  for (var key in intersections) {
    var collisionPoint = intersections[key].point;
    Level5.Debug.drawPoint(scene, collisionPoint);
  }


};