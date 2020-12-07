export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    const pauseAudio = new Audio("./src/sound/sfx_sounds_pause2_in.wav").play();
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  pause() {
    const pauseAudio = new Audio(
      "./src/sound/sfx_sounds_pause2_out.wav"
    ).play();
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.view.renderGameOverScreen(state);
      this.stopTimer();
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen(state);
    } else {
      this.view.renderMainScreen(state);
    }
  }

  handleKeyDown(e) {
    const state = this.game.getState();
    switch (e.keyCode) {
      case 13: // Enter
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 37:
      case 65: // left arrow
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 38: // up arrow
      case 32:
      case 87:
        this.game.rotatePiece();
        this.updateView();
        break;
      case 39: // right arrow
      case 68:
        this.game.movePieceRight();
        this.updateView();
        break;
      case 40: // down arrow
      case 83:
        this.game.movePieceDown();
        this.stopTimer();
        this.updateView();
        break;
    }
  }
  handleKeyUp(e) {
    switch (e.keyCode) {
      case 40: // down arrow
      case 83:
        this.startTimer();
        break;
    }
  }
}
