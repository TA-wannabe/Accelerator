function onReady () {
  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";

  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var bubble = new Level5.WaterBubble(100, 32, 32);
  scene.add(bubble);

/*
  var bubble = new Level5.WaterBubble(100, 32, 32);
  scene.add(bubble);
  bubble.translate(new THREE.Vector3(-200, 200, 0));
*/

  for (var i=400; i<700; i += 100) {
    var light = new Level5.Light({
      waveLength: i,
      startPoint: new THREE.Vector3(-1000, 150, 0),
      direction: new THREE.Vector3(1, -0.1, 0),
      life: 3
    });
    light.shoot(scene);
  }

  camera.position.z = 1000;

  function render() {
    renderer.render(scene, camera);
  }
  render();
}