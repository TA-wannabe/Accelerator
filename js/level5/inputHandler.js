Level5.InputState = {
  Normal: 0,
  AddBubbleMode: 1,
  AddLightMode: 2
};

Level5.InputHandler = function (sceneManager) {
  this.sceneManager = sceneManager;
  this.state = {
    state: Level5.InputState.Normal,
    set: function (state) {
      console.log(this.state, state);
      if (state === this.state) {
        this.state = Level5.InputState.Normal;
      }
      else {
        this.state = state;
      }
      console.log('Mode set : ', this.state);
    },
    get: function () {
      return this.state;
    }
  };
};

Level5.InputHandler.prototype.delegateInput = function (window, scene, camera) {
  var mouseVector = new THREE.Vector3();
  var projector = new THREE.Projector();
  var objects = this.sceneManager.getOpticalMaterials();
  var width = window.innerWidth;
  var height = window.innerHeight;
  var savedColor = new THREE.Color();
  var addBubbleMode = false;

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

    // object adding mode
    var state = this.state.get();
    if (state === Level5.InputState.AddBubbleMode) {
      this.sceneManager.setTrackballControlEnabled(false);

      var unprojectedVector = projector.unprojectVector(mouseVector.clone(), camera);

      var radius = 70 + Math.random() * 60;
      var bubble = new Level5.WaterBubble(radius, 100, 100);
      bubble.translate(unprojectedVector);
      this.sceneManager.addOpticalMaterial(bubble);
    }
    // light adding mode
    else if (state === Level5.InputState.AddLightMode) {
      this.sceneManager.setTrackballControlEnabled(false);

      var cameraLookAt = new THREE.Vector3(0, 0, -1);
      cameraLookAt.applyQuaternion(camera.quaternion);
      var whiteRay = Level5.Light.createWhiteRay(
        projector.unprojectVector(mouseVector.clone(), camera),
        cameraLookAt
      );
      whiteRay.forEach((function (ray) {
        this.sceneManager.addLight(ray);
      }).bind(this));
    }
    // object picking mode
    else if (state === Level5.InputState.Normal) {
      var raycaster = projector.pickingRay(mouseVector.clone(), camera);
      var intersects = raycaster.intersectObjects(objects, false);
      
      if (intersects.length > 0) {
        this.sceneManager.setTrackballControlEnabled(false);
        var intersect = intersects.shift();
        pickedObject = intersect.object;
        savedColor.copy(pickedObject.material.color);
        pickedObject.material.color.setRGB(1.0, 0, 0);

        prevIntersectPoint.copy(pickedObject.getBoundingSphereCenter());
        plane.position.copy(pickedObject.getBoundingSphereCenter());
        plane.lookAt(camera.position);
      }
    }
  }).bind(this);

  var onMouseUp = (function (e) {
    e.preventDefault();
    this.sceneManager.setTrackballControlEnabled(true);

    if (pickedObject !== null) {
      pickedObject.material.color.copy(savedColor);
    }
    pickedObject = null;

    //this.sceneManager.resetLight();
  }).bind(this);

  var onKeyDown = (function (e) {
    switch (e.keyCode) {
      case 82: /* r */
        this.sceneManager.resetLight();
        break;
      case 65: /* a */
        this.state.set(Level5.InputState.AddBubbleMode);
        break;
      case 76:
        this.state.set(Level5.InputState.AddLightMode);
        break;
    }
  }).bind(this);

  this.sceneManager.renderer.domElement.addEventListener('mouseup', onMouseUp, false);
  this.sceneManager.renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  this.sceneManager.renderer.domElement.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('keydown', onKeyDown, false);
};
