import Phaser from 'phaser';

export default class SuperimposedFiguresScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SuperimposedFiguresScene' });
  }

  preload() {
    // Cargar las imágenes
    this.load.image('complexFigure', 'assets/complexFigure.png');
    this.load.image('image1', '/assets/image1.png');
    this.load.image('image2', '/assets/option2.png');
    this.load.image('image3', '/assets/option3.png');
    this.load.image('image4', '/assets/option4.png');
  }

  create() {
    // Variables de estado
    this.currentAttempt = 0;
    this.correctAnswers = 0;
    this.missedAnswers = 0;

    // Mostrar la figura compleja
    this.add.image(400, 200, 'complexFigure');

    // Crear botones de opciones
    const options = ['option1', 'option2', 'option3', 'option4'];
    this.createOptions(options);

    // Temporizador
    this.timer = this.time.delayedCall(25000, this.handleTimeout, [], this);
  }

  createOptions(options) {
    const positions = [
      { x: 200, y: 400 },
      { x: 400, y: 400 },
      { x: 600, y: 400 },
      { x: 800, y: 400 },
    ];

    options.forEach((option, index) => {
      const button = this.add.image(positions[index].x, positions[index].y, option)
        .setInteractive()
        .on('pointerdown', () => this.handleOptionClick(option));

      button.setScale(0.5); // Escalar imágenes si son grandes
    });
  }

  handleOptionClick(selectedOption) {
    // Lógica para manejar la respuesta seleccionada
    const correctOption = 'option1'; // Ejemplo: opción correcta

    if (selectedOption === correctOption) {
      this.correctAnswers++;
      console.log('¡Correcto!');
    } else {
      console.log('Incorrecto.');
    }

    this.nextAttempt();
  }

  handleTimeout() {
    console.log('Tiempo agotado.');
    this.missedAnswers++;
    this.nextAttempt();
  }

  nextAttempt() {
    this.currentAttempt++;

    if (this.missedAnswers >= 3 || this.currentAttempt >= 5) {
      this.endGame();
    } else {
      this.scene.restart();
    }
  }

  endGame() {
    console.log(`Juego terminado. Respuestas correctas: ${this.correctAnswers}`);
    this.scene.stop();
  }
}
