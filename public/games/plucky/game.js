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
const altColor = "#FFDE59";
const playerColor = "white";
let playButtonBlinkId;

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
    menuLoop.stop();
    clearInterval(playButtonBlinkId);
    gameLoop.start();
  },

  render() {
    if (this.hover) {
      this.text.font = `24px "Press Start 2P", sans-serif`;
    }
  },
});

function playButtonBlink() {
  playButton.textNode.color = playButton.textNode.color == color ? altColor : color;
}

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
const background = Sprite({
  x: 0,
  y: 0,
  color: altColor,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
});

const player = Sprite({
  x: 48,
  y: 368,
  color: playerColor,
  width: 16,
  height: 16,
});

const PLATFORM_WIDTH = 64;
const PLATFORM_HEIGHT = 16;
const PLATFORM_X_LEFT = 24;
const PLATFORM_X_CENTRE = Math.floor((BASE_WIDTH / 2) - (PLATFORM_WIDTH / 2));
const PLATFORM_X_RIGHT = BASE_WIDTH - 48 - (PLATFORM_WIDTH / 2);
const platformProps = {
  color,
  width: PLATFORM_WIDTH,
  height: PLATFORM_HEIGHT,
};

const platforms = [
  Sprite({
    x: PLATFORM_X_LEFT,
    y: 384,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_CENTRE,
    y: 320,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_RIGHT,
    y: 384,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_LEFT,
    y: 256,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_CENTRE,
    y: 192,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_RIGHT,
    y: 256,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_LEFT,
    y: 128,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_CENTRE,
    y: 64,
    ...platformProps,
  }),
  Sprite({
    x: PLATFORM_X_RIGHT,
    y: 128,
    ...platformProps,
  }),
];

// GAME LOOPS
const menuLoop = GameLoop({
  update: function () { },
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

    platforms.forEach(p => p.update());
  },
  render: function () {
    background.render();
    borders.forEach((border) => border.render());
    platforms.forEach(p => p.render());
    player.render();
  },
  context,
});

// menuLoop.start();
// playButtonBlinkId = setInterval(playButtonBlink, 500);
gameLoop.start();
