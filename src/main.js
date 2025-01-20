import Phaser from 'phaser';
import SuperimposedFiguresScene from './scenes/SuperimposedFiguresScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [SuperimposedFiguresScene],
};

const game = new Phaser.Game(config);
