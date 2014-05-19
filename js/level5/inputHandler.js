Level5.InputHandler = function (sceneManager) {
  this.sceneManager = sceneManager;
};

Level5.InputHandler.prototype.delegateInput = function (window, scene, camera) {
  var mouseVector = new THREE.Vector3();
  var projector = new THREE.Projector();
  var objects = this.sceneManager.getOpticalMaterials();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var onMouseMove = (function (e) {
    e.preventDefault();
  }).bind(this);

  var onMouseDown = (function (e) {
    e.preventDefault();

    mouseVector.x = 2 * (e.clientX / width) - 1;
    mouseVector.y = 1 - 2 * (e.clientY / height);
    var raycaster = projector.pickingRay(mouseVector.clone(), camera);
    var intersects = raycaster.intersectObjects(objects, false);
    
    if (intersects.length > 0) {
      this.sceneManager.toggleTrackballControl();
      var pickedObject = intersects.shift().object;
      pickedObject.material.color.setRGB(1.0, 0, 0);
      console.log(pickedObject.acquiredLights);
    }
  }).bind(this);

  var onMouseUp = (function (e) {
    e.preventDefault();
    this.sceneManager.toggleTrackballControl();
  }).bind(this);

  this.sceneManager.renderer.domElement.addEventListener('mouseup', onMouseUp, false);
  this.sceneManager.renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  this.sceneManager.renderer.domElement.addEventListener('mousemove', onMouseMove, false);
};