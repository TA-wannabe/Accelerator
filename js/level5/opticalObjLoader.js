Level5.OpticalObjLoader = function (params, onload) {
  var manager = new THREE.LoadingManager();
  var loader = new THREE.OBJLoader(manager);
  loader.load(params.objFileName, (function (obj) {

    //obj -> Object3D, but children is instanceof OpticalMaterial
    obj = obj.children[0];
    obj.material.color.setHex(0x0080ff);
    obj.material.opacity = 0.3;
    obj.material.transparent = true;
    obj.material.side = THREE.DoubleSide;
    obj.setRefractionIndex(params.refractionIndex);

    onload(obj);

  }).bind(this));
};
