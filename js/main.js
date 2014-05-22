function onReady () {
  var sceneManager = new Level5.SceneManager(window);

  var manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  var loader = new THREE.OBJLoader(manager);
  loader.load('obj/diamond.obj', function (obj) {
    obj.traverse(function (child) {
      if (child instanceof Level5.OpticalMaterial) {
        child.material.color.setHex(0x0080ff);
        child.material.opacity = 0.3;
        child.material.transparent = true;
        child.material.side = THREE.DoubleSide;
        child.setRefractionIndex(2.3);
      }
    });
    sceneManager.scene.add(obj);
  });

  sceneManager.startRender();
}
