Level5.InputHandler = function (sceneManager) {
  this.sceneManager = sceneManager;
};

Level5.InputHandler.prototype.delegateInput = function (window, scene, camera) {
  var mouseVector = new THREE.Vector3();
  var projector = new THREE.Projector();
  var objects = this.sceneManager.getOpticalMaterials();
  var width = window.innerWidth;
  var height = window.innerHeight;

  // for moving object
  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.25,
      transparent: true,
      wireframe: true
    }));
  plane.visible = false;
  this.sceneManager.scene.add(plane);

  var prevIntersectPoint = new THREE.Vector3();


  var pickedObject = null;

  var onMouseMove = (function (e) {
    e.preventDefault();

    mouseVector.x = 2 * (e.clientX / width) - 1;
    mouseVector.y = 1 - 2 * (e.clientY / height);

    if (pickedObject !== null) {
      var raycaster = projector.pickingRay(mouseVector.clone(), camera);
      var intersects = raycaster.intersectObject(plane, false);
      var delta = new THREE.Vector3();
      delta.subVectors(intersects[0].point, prevIntersectPoint);
      prevIntersectPoint = intersects[0].point;
      pickedObject.translate(delta);
    }

  }).bind(this);

  var onMouseDown = (function (e) {
    e.preventDefault();

    var raycaster = projector.pickingRay(mouseVector.clone(), camera);
    var intersects = raycaster.intersectObjects(objects, false);
    
    if (intersects.length > 0) {
      this.sceneManager.setTrackballControlEnabled(false);
      var intersect = intersects.shift();
      pickedObject = intersect.object;
      pickedObject.material.color.setRGB(1.0, 0, 0);

      prevIntersectPoint.copy(pickedObject.getBoundingSphereCenter());
      plane.position.copy(pickedObject.getBoundingSphereCenter());
      plane.lookAt(camera.position);
    }
  }).bind(this);

  var onMouseUp = (function (e) {
    e.preventDefault();
    this.sceneManager.setTrackballControlEnabled(true);
    pickedObject = null;
  }).bind(this);

  this.sceneManager.renderer.domElement.addEventListener('mouseup', onMouseUp, false);
  this.sceneManager.renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  this.sceneManager.renderer.domElement.addEventListener('mousemove', onMouseMove, false);
};