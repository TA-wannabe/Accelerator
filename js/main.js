function onReady () {
  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -1000, 1000 );
  var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";

  renderer.setSize( width, height );
  renderer.setClearColor(0x000000);

  document.body.appendChild( renderer.domElement );

  var bubble = new Level5.WaterBubble(100, 32, 32);
  scene.add(bubble);
  bubble.translate(new THREE.Vector3(0, -50, 0));

  bubble = new Level5.WaterBubble(100, 32, 32);
  scene.add(bubble);
  bubble.translate(new THREE.Vector3(-200, 200, 0));

  for (var i=400; i<700; i += 10) {
    var light = new Level5.Light({
      waveLength: i,
      startPoint: new THREE.Vector3(-1000, 0, 0),
      direction: new THREE.Vector3(1, 0, 0),
      life: 9
    });
    light.shoot(scene);
  }

  camera.position.z = 100;
  camera.lookAt(scene.position);

  var angle = 0;
  function render() {
    requestAnimationFrame(render);

    // rotate camera around y-axis
    camera.position.x = 100 * Math.cos(angle);
    camera.position.y = 0;
    camera.position.z = 100 * Math.sin(angle);
    camera.lookAt(scene.position);

    angle += 0.01;

    renderer.render(scene, camera);
  }
  render();
}