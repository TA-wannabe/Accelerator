function onReady () {
  var sceneManager = new Level5.SceneManager(window);

  var obj = new Level5.OpticalObjLoader({
    objFileName: 'obj/diamond.obj',
    refractionIndex: 2.3
  }, function (opticalMaterial) {
    sceneManager.addOpticalMaterial(opticalMaterial);
    sceneManager.startRender();
  });
}
