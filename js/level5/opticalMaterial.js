Level5.OpticalMaterial = function (geometry, material) {
  THREE.Mesh.call(this, geometry, material);

  // optics property
  this.refractionIndex = 1.0;
};

Level5.OpticalMaterial.prototype = Object.create(THREE.Mesh.prototype);

// alternative to translate function of Object3D
Level5.OpticalMaterial.prototype.translate = function (delta) {
  this.geometry.vertices.forEach(function (vertex) {
    vertex.addVectors(vertex, delta);
  });
  this.geometry.computeBoundingSphere();
};

// Optics function
Level5.OpticalMaterial.prototype.setRefractionIndex = function (index) {
  this.refractionIndex = index;
};