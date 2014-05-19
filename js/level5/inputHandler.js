Level5.InputHandler = {};

Level5.InputHandler.delegateInput = function (window, scene, camera) {
  var mouseVector = new THREE.Vector3();
  var projector = new THREE.Projector();
  var objects = scene.children;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var onMouseMove = function (e) {

  };

  var onMouseDown = function (e) {
    mouseVector.x = 2 * (e.clientX / width) - 1;
    mouseVector.y = 1 - 2 * (e.clientY / height);
    var raycaster = projector.pickingRay(mouseVector.clone(), camera);
    var intersects = raycaster.intersectObjects(objects);
    for (var i in intersects) {
      intersects[i].object.material.color.setRGB(1.0, 0, 0);
    }
  };

  (function (window) {
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
  })(window);
};