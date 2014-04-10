Level5.WaterBubble = function (radius, widthSegments, heightSegments) {
  THREE.Mesh.call(this,
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({
    color: 0x00a86b,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  }));

  this.refractionIndex = 1.3264;
};

Level5.WaterBubble.prototype = Object.create(THREE.Mesh.prototype);

// alternative to translate function of Object3D
Level5.WaterBubble.prototype.translate = function (delta) {
  this.geometry.vertices.forEach(function (vertex) {
    vertex.addVectors(vertex, delta);
  });
  this.geometry.computeBoundingSphere();
};