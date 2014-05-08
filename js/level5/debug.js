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

Level5.Debug.drawHalfLine = function (scene, startPoint, direction, color) {
  var material = new THREE.LineBasicMaterial({
    color: color,
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( startPoint.clone() );
  var endPoint = new THREE.Vector3();
  geometry.vertices.push( endPoint.addVectors(startPoint, direction.clone().multiplyScalar(1000000)) );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
};

Level5.Debug.drawSegment = function (scene, startPoint, endPoint, color) {
  var material = new THREE.LineBasicMaterial({
    color: color,
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( startPoint.clone() );
  geometry.vertices.push( endPoint.clone() );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
};

Level5.Debug.drawAxis = function (scene) {
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(-10000, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Color(0xff0000));
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(0, -10000, 0), new THREE.Vector3(0, 1, 0), new THREE.Color(0x00ff00));
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(0, 0, -10000), new THREE.Vector3(0, 0, 1), new THREE.Color(0x0000ff));
};