const { init, initPointer, Button, GameLoop, Sprite } = kontra;

// Initialize canvas without setting size
const { canvas } = init();
initPointer(); // Needed for buttons to work
const context = canvas.getContext("2d");

// Set base game scale and resolution
const BASE_WIDTH = 270;
const BASE_HEIGHT = 480;
// Set canvas size
canvas.width = BASE_WIDTH;
canvas.height = BASE_HEIGHT;

const color = "black";

// MENU
const menuTextOptions = {
  color,
  font: `20px "Press Start 2P", sans-serif`,
  anchor: { x: 0.5, y: 0.5 },
};

const playButton = new Button({
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: "Play?",
    ...menuTextOptions,
    textAlign: "center",
  },
  onUp() {
    console.log("here we go");
    menuLoop.stop();
    gameLoop.start();
  },

  render() {
    if (this.focused) {
      this.text.font = `24px "Press Start 2P", sans-serif`;
    }
  },
});

// BORDERS
const borderThickness = 2;
const borders = [
  // Left
  Sprite({
    x: 0,
    y: 0,
    width: borderThickness,
    height: BASE_HEIGHT,
    color,
  }),
  // Top
  Sprite({
    x: 0,
    y: 0,
    width: BASE_WIDTH,
    height: borderThickness,
    color,
  }),
  // Right
  Sprite({
    x: BASE_WIDTH - borderThickness,
    y: 0,
    width: borderThickness,
    height: BASE_HEIGHT,
    color,
  }),
  // Bottom
  Sprite({
    x: 0,
    y: BASE_HEIGHT - borderThickness,
    width: BASE_WIDTH,
    height: borderThickness,
    color,
  }),
];

// GAME
const player = Sprite({
  x: 100,
  y: 80,
  color,
  width: 20,
  height: 40,
  dx: 2,
});

// GAME LOOPS
const menuLoop = GameLoop({
  update: function () {},
  render: function () {
    playButton.render();
  },
  context,
});

const gameLoop = GameLoop({
  update: function () {
    player.update();

    if (player.x > BASE_WIDTH) {
      player.x = -player.width;
    }
  },
  render: function () {
    player.render();
    borders.forEach((border) => border.render());
  },
  context,
});

console.log("button: ", playButton);
menuLoop.start();
