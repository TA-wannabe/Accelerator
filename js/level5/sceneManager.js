Level5.SceneManager = function (window) {
  this.scene = new THREE.Scene();
  var width = this.width = window.innerWidth;
  var height = this.height = window.innerHeight;

  this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -1000, 1000 );
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
  this.opticsMaterials = [];
  this.lights = [];

  // Input Handler
  Level5.InputHandler.delegateInput(window, this.scene, this.camera);
};

Level5.SceneManager.prototype.addOpticsMaterial = function (material) {
  this.opticsMaterials.push(material);
  this.scene.add(material);
};

Level5.SceneManager.prototype.addLight = function (light) {
  this.lights.push(light);
  light.shoot(this.scene);
};

Level5.SceneManager.prototype.startRender = function () {
  var angle = Math.PI / 2;
  var render = (function () {
    requestAnimationFrame(render);
    this.camera.position.x = 100 * Math.cos(angle);
    this.camera.position.y = 0;
    this.camera.position.z = 100 * Math.sin(angle);
    this.camera.lookAt(this.scene.position);

    //angle += 0.01;
    this.renderer.render(this.scene, this.camera);
  }).bind(this);
  render();
};