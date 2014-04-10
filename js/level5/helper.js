Level5.Helper = {};

Level5.Helper.convertWaveLengthToColor = function (waveLength) {

};

Level5.Helper.calculateRefractionIndexWithWaveLength = function (refractionIndex, waveLength) {
  return refractionIndex + 0.1140 * Math.exp(-0.0048 * waveLength);
};