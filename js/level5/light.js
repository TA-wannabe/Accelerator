var limit = 6;

Level5.Light = function (params) {
  // if Light is instance of THREE.Line,
  // then we need calculate refraction etc. 
  // from custom renderer.

  this.waveLength = params.waveLength;
  this.startPoint = params.startPoint;
  this.direction = params.direction;
  this.direction.normalize();

  this.children = [];
  this.parent = params.parent || null;
  if (this.parent !== null) {
    this.parent.children.push(this);
  }

  this.life = params.life;
};

Level5.Light.prototype.shoot = function (scene) {

/*
  limit = limit - 1;
  if (limit < 0) {
    return;
  }
*/

  if (this.life <= 0) {
    return;
  }

  var objects = scene.children;
  var raycaster = new THREE.Raycaster(this.startPoint, this.direction);
  var intersections = raycaster.intersectObjects(objects, true);

  // find a collision point with face.
  var intersection = null;

  for (var key in intersections) {
    var collisionPoint = intersections[key].point;
    //Level5.Debug.drawPoint(scene, collisionPoint);
    if (intersections[key].face !== null) {
      intersection = intersections[key];
      break;
    }
  }

  if (intersection === null) {
    Level5.Debug.drawHalfLine(scene, this.startPoint, this.direction, Level5.Helper.waveLengthToRGBA(this.waveLength));
    return;
  }

  Level5.Debug.drawSegment(scene, this.startPoint, intersection.point, Level5.Helper.waveLengthToRGBA(this.waveLength));


  // reflection
  var collisionNormal = intersection.face.normal;
  var collisionPoint2d = intersection.point.clone();
  collisionPoint2d.z = 0;

  var reflectionVector = this.direction.clone();
  reflectionVector.reflect(collisionNormal);
  // for 2d simulation
  reflectionVector.z = 0;
  reflectionVector.normalize();


  var reflectedLight = new Level5.Light({
    waveLength: this.waveLength,
    startPoint: collisionPoint2d,
    direction: reflectionVector,
    life: this.life - 1,
    parent: this
  });

  reflectedLight.shoot(scene);

  // refraction
  // direction of light? inside to outside, or not.
  var incidenceAngle = collisionNormal.clone().negate().angleTo(this.direction);
  var refractionIndex = Level5.Helper.calculateRefractionIndexWithWaveLength(intersection.object.refractionIndex,
      this.waveLength);

  var collisionNormalClone = collisionNormal.clone();
  // inside to outside
  if (incidenceAngle > Math.PI / 2) {
    collisionNormalClone.negate();
    refractionIndex = 1.0 / refractionIndex;
  }

  var refractionAngle = Math.asin(Math.sin(incidenceAngle) / refractionIndex);
  var refractionDirection = new THREE.Vector3();

  if (collisionNormalClone.clone().negate().cross(this.direction).z < 0) {
    refractionDirection.set(
      Math.cos(refractionAngle) * -collisionNormalClone.x + Math.sin(refractionAngle) * -collisionNormalClone.y,
      Math.sin(refractionAngle) * collisionNormalClone.x + Math.cos(refractionAngle) * -collisionNormalClone.y,
      0);
  }
  else {
      refractionDirection.set(
    Math.cos(refractionAngle) * -collisionNormalClone.x - Math.sin(refractionAngle) * -collisionNormalClone.y,
    Math.sin(refractionAngle) * -collisionNormalClone.x + Math.cos(refractionAngle) * -collisionNormalClone.y,
    0);
  }

  var refractedLight = new Level5.Light({
    waveLength: this.waveLength,
    startPoint: collisionPoint2d,
    direction: refractionDirection,
    life: this.life - 1,
    parent: this
  });

  refractedLight.shoot(scene);
};

Level5.Light.prototype.clone = function () {
  return new Level5.Light({
    waveLength: this.waveLength,
    startPoint: this.startPoint,
    direction: this.direction,
    life: this.life,
    parent: this.parent
  });
};