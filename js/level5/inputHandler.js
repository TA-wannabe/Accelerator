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

  };

  var onMouseDown = function (e) {
    mouseVector.x = 2 * (e.clientX / width) - 1;
    mouseVector.y = 1 - 2 * (e.clientY / height);
    var raycaster = projector.pickingRay(mouseVector.clone(), camera);
    var intersects = raycaster.intersectObjects(objects, false);
    
    if (intersects.length > 0) {
      var pickedObject = intersects.shift().object;
      pickedObject.material.color.setRGB(1.0, 0, 0);
      console.log(pickedObject.acquiredLights);
    }
  };

  (function (window) {
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
  })(window);
};