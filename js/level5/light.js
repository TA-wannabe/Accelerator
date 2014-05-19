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

  // medium is nullable OpticalMaterial object, null -> vaccum.
  // medium will be changed only refraction occurred.
  this.medium = params.medium || null;

  // drawable
  this.mesh = null;
};

Level5.Light.prototype.shoot = function (scene) {

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
    this.mesh = Level5.Helper.getHalfLineMesh(this.startPoint, this.direction, Level5.Helper.waveLengthToRGBA(this.waveLength));
    scene.add(this.mesh);
    return;
  }

  this.mesh = Level5.Helper.getSegmentMesh(this.startPoint, intersection.point, Level5.Helper.waveLengthToRGBA(this.waveLength));
  scene.add(this.mesh);

  // reflection
  var collidedObject = intersection.object;
  var collisionObjectCenter = collidedObject.getBoundingSphereCenter();
  var collisionNormal = intersection.point.clone().sub(collisionObjectCenter).normalize();
  var collisionPoint = intersection.point.clone();

  var reflectionVector = this.direction.clone();
  reflectionVector.reflect(collisionNormal);
  reflectionVector.normalize();

  var reflectedLight = new Level5.Light({
    waveLength: this.waveLength,
    startPoint: collisionPoint,
    direction: reflectionVector,
    life: this.life - 1,
    parent: this,
    medium: this.medium
  });

  reflectedLight.shoot(scene);

  // refraction
  // direction of light? inside to outside, or not.

  // change a medium for light.
  // enter a new medium.
  if (this.medium !== collidedObject) {
    this.medium = collidedObject;
    this.medium.acquireLight(this);
  }
  // go out from a medium.
  else {
    this.medium = null;
  }

  var incidenceAngle = collisionNormal.clone().negate().angleTo(this.direction);
  var refractionIndex = Level5.Helper.calculateRefractionIndexWithWaveLength(intersection.object.refractionIndex,
      this.waveLength);

  var collisionNormalClone = collisionNormal.clone();
  // inside to outside
  if (incidenceAngle > Math.PI / 2) {
    incidenceAngle = Math.PI - incidenceAngle;
    collisionNormalClone.negate();
    refractionIndex = 1.0 / refractionIndex;
  }

  var refractionAngle = Math.asin(Math.sin(incidenceAngle) / refractionIndex);
  var refractionDirection = Level5.Helper.calculateRefrectionVector(this.direction.clone(), collisionNormalClone.clone(), incidenceAngle, refractionAngle);

  var refractedLight = new Level5.Light({
    waveLength: this.waveLength,
    startPoint: collisionPoint,
    direction: refractionDirection,
    life: this.life - 1,
    parent: this,
    medium: this.medium
  });

  refractedLight.shoot(scene);
};

Level5.Light.prototype.clone = function () {
  return new Level5.Light({
    waveLength: this.waveLength,
    startPoint: this.startPoint,
    direction: this.direction,
    life: this.life,
    parent: this.parent,
    medium: this.medium
  });
};