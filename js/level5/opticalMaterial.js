Level5.OpticalMaterial = function (geometry, material) {
  THREE.Mesh.call(this, geometry, material);

  // optics property
  // Lights in this material.
  this.acquiredLights = [];
  this.refractionIndex = 1.0;
};

Level5.OpticalMaterial.prototype = Object.create(THREE.Mesh.prototype);

// alternative to translate function of Object3D
Level5.OpticalMaterial.prototype.translate = function (delta) {
  this.geometry.vertices.forEach(function (vertex) {
    vertex.addVectors(vertex, delta);
  });

  this.geometry.verticesNeedUpdate = true;
  this.geometry.elementsNeedUpdate = true;
  this.geometry.morphTargetsNeedUpdate = true;
  this.geometry.uvsNeedUpdate = true;
  this.geometry.normalsNeedUpdate = true;
  this.geometry.colorsNeedUpdate = true;
  this.geometry.tangentsNeedUpdate = true;
  
  this.geometry.computeBoundingSphere();
};

// Optics function
Level5.OpticalMaterial.prototype.setRefractionIndex = function (index) {
  this.refractionIndex = index;
};

Level5.OpticalMaterial.prototype.getBoundingSphereCenter = function () {
  return this.geometry.boundingSphere.center;
};

Level5.OpticalMaterial.prototype.acquireLight = function (light) {
  this.acquiredLights.push(light);
};