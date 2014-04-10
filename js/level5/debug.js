Level5.Debug = {};

Level5.Debug.drawPoint = function (scene, position) {
  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  });

  var radius = 5;
  var segments = 32;

  var circleGeometry = new THREE.CircleGeometry( radius, segments );
  var circle = new THREE.Mesh( circleGeometry, material );
  circle.position = position;
  scene.add( circle );
};

Level5.Debug.drawHalfLine = function (scene, startPoint, direction) {
  var material = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( startPoint.clone() );
  var endPoint = new THREE.Vector3();
  geometry.vertices.push( endPoint.addVectors(startPoint, direction.clone().multiplyScalar(1000000)) );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
};

Level5.Debug.drawSegment = function (scene, startPoint, endPoint) {
  var material = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( startPoint.clone() );
  geometry.vertices.push( endPoint.clone() );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
};