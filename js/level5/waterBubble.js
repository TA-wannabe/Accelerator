Level5.WaterBubble = function (radius, widthSegments, heightSegments) {
  THREE.Mesh.call(this,
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({
    color: 0x00a86b,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  }));
};

Level5.WaterBubble.prototype = Object.create(THREE.Mesh.prototype);