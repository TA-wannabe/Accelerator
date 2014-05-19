Level5.SceneManager = function (window) {
  this.scene = new THREE.Scene();
  var width = this.width = window.innerWidth;
  var height = this.height = window.innerHeight;

  //this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -1000, 1000 );
  this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  this.camera.position.z = 100;
  this.camera.lookAt(this.scene.position);

  this.renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

  this.renderer.domElement.style.position = "absolute";
  this.renderer.domElement.style.top = "0px";
  this.renderer.domElement.style.left = "0px";

  this.renderer.setSize( width, height );
  this.renderer.setClearColor(0x000000);

  document.body.appendChild(this.renderer.domElement);

  // Optics
  this.opticalMaterials = [];
  this.lights = [];

  // Trackball Controller
  this.trackballControls = new THREE.TrackballControls(this.camera);
  this.trackballControls.rotateSpeed = 1.0;
  this.trackballControls.zoomSpeed = 1.2;
  this.trackballControls.panSpeed = 0.8;
  this.trackballControls.noZoom = false;
  this.trackballControls.noPan = false;
  this.trackballControls.staticMoving = true;
  this.trackballControls.dynamicDampingFactor = 0.3;

  // Input Handler
  this.inputHandler = new Level5.InputHandler(this);
  this.inputHandler.delegateInput(window, this.scene, this.camera);
};

Level5.SceneManager.prototype.addOpticalMaterial = function (material) {
  this.opticalMaterials.push(material);
  this.scene.add(material);
};

Level5.SceneManager.prototype.getOpticalMaterials = function () {
  return this.opticalMaterials;
};

Level5.SceneManager.prototype.addLight = function (light) {
  this.lights.push(light);
  light.shoot(this.scene);
};

Level5.SceneManager.prototype.setTrackballControlEnabled = function (enabled) {
  this.trackballControls.enabled = enabled;
};

Level5.SceneManager.prototype.startRender = function () {
  var angle = Math.PI / 2;
  var render = (function () {
    requestAnimationFrame(render);
    this.trackballControls.update();
    this.renderer.render(this.scene, this.camera);
  }).bind(this);
  render();
};

Level5.SceneManager.prototype.resetLight = function () {
  var iterateChildren = (function (light) {
    for (var i in light.children) {
      iterateChildren(light.children[i]);
    }
    this.scene.remove(light.mesh);
  }).bind(this);
  for (var i in this.lights) {
    iterateChildren(this.lights[i]);
  }
  for (var i in this.lights) {
    this.lights[i].shoot(this.scene);
  }
};