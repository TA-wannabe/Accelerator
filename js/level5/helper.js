Level5.Helper = {};

Level5.Helper.convertWaveLengthToColor = function (waveLength) {

};

Level5.Helper.calculateRefractionIndexWithWaveLength = function (refractionIndex, waveLength) {
  return refractionIndex + 0.1140 * Math.exp(-0.0048 * waveLength);
};

Level5.Helper.waveLengthToRGBA = function (waveLength) {
  var R, G, B, alpha, wl = waveLength;
  if (wl >= 380 && wl < 440) {
    R = -1 * (wl - 440) / (440 - 380);
    G = 0;
    B = 1;
  } else if (wl >= 440 && wl < 490) {
    R = 0;
    G = (wl - 440) / (490 - 440);
    B = 1;
  } else if (wl >= 490 && wl < 510) {
    R = 0;
    G = 1;
    B = -1 * (wl - 510) / (510 - 490);
  } else if (wl >= 510 && wl < 580) {
    R = (wl - 510) / (580 - 510);
    G = 1;
    B = 0;
  } else if (wl >= 580 && wl < 645) {
    R = 1;
    G = -1 * (wl - 645) / (645 - 580);
    B = 0.0;
  } else if (wl >= 645 && wl <= 780) {
    R = 1;
    G = 0;
    B = 0;
  } else {
    R = 0;
    G = 0;
    B = 0;
  }
  if (wl > 780 || wl < 380) {
    alpha = 0;
  } else if (wl > 700) {
    alpha = (780 - wl) / (780 - 700);
  } else if (wl < 420) {
    alpha = (wl - 380) / (420 - 380);
  } else {
    alpha = 1;
  }
  var color = new THREE.Color(R, G, B);
  color.a = alpha;

  return color;
};

Level5.Helper.drawAxis = function (scene) {
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(-10000, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Color(0xff0000));
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(0, -10000, 0), new THREE.Vector3(0, 1, 0), new THREE.Color(0x00ff00));
  Level5.Debug.drawHalfLine(scene, new THREE.Vector3(0, 0, -10000), new THREE.Vector3(0, 0, 1), new THREE.Color(0x0000ff));
};