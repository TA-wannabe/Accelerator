Level5.InputHandler = function (sceneManager) {
  this.sceneManager = sceneManager;
};

Level5.InputHandler.prototype.delegateInput = function (window, scene, camera) {
  var mouseVector = new THREE.Vector3();
  var projector = new THREE.Projector();
  var objects = this.sceneManager.getOpticalMaterials();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var onMouseMove = function (e) {
    e.preventDefault();
  };

  var onMouseDown = function (e) {
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
  };

  var onMouseUp = function (e) {
    e.preventDefault();
    this.sceneManager.toggleTrackballControl();
  };

  (function (window) {
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
  })(window);
};