function onReady () {
  var sceneManager = new Level5.SceneManager(window);

  var bubble = new Level5.WaterBubble(100, 100, 100);
  bubble.translate(new THREE.Vector3(0, -50, 10));
  sceneManager.addOpticalMaterial(bubble);

  bubble = new Level5.WaterBubble(100, 100, 100);
  bubble.translate(new THREE.Vector3(-100, 200, 0));
  sceneManager.addOpticalMaterial(bubble);

  for (var i=400; i<700; i+=30) {
    var light = new Level5.Light({
      waveLength: i,
      startPoint: new THREE.Vector3(-1000, 0, 0),
      direction: new THREE.Vector3(1, 0, 0),
      life: 9
    });
    sceneManager.addLight(light);
  }

  sceneManager.startRender();
}