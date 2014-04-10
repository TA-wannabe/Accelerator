function onReady () {
  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  var renderer = new THREE.WebGLRenderer( { alpha: true } );

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";

  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var bubble = new Level5.WaterBubble(100, 32, 32);
  scene.add(bubble);

  var light = new Level5.Light({
    waveLength: 430,
    startPoint: new THREE.Vector3(-1000, 10, 0),
    direction: new THREE.Vector3(1, -0.1, 0)
  });
  light.shoot(scene);

  camera.position.z = 1000;

  function render() {
    renderer.render(scene, camera);
  }
  render();
}