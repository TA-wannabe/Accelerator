Level5.WaterBubble = function (radius, widthSegments, heightSegments) {
  Level5.OpticalMaterial.call(this,
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({
    color: 0x00a86b,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  }));

  this.setRefractionIndex(1.3264);
};

Level5.WaterBubble.prototype = Object.create(Level5.OpticalMaterial.prototype);