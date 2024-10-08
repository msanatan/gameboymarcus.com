const { init, initKeys, initPointer, keyPressed, Button, GameLoop, Sprite, Text } = kontra;

// Initialize canvas without setting size
const { canvas } = init();
initPointer(); // Needed for buttons to work
initKeys(); // Needed for keyboard input to work
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
let restartButtonBlinkId;

// Game states
const MENU = 0;
const PLAYING = 1;
const GAME_OVER = 2;
let gameState = MENU;

// Game variables
let score = 0;
let highScore = 0;
let platformSpeed = 0.5;
const maxPlatformSpeed = 2;
const platformSpeedIncreaseRate = 0.0001;

// MENU
const menuTextOptions = {
  color,
  font: `20px "Press Start 2P", sans-serif`,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
};

const playButton = Button({
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: "Play?",
    ...menuTextOptions,
  },
  onDown() {
    startGame();
  },
  render() {
    this.draw();
    if (this.hovered) {
      this.textNode.font = `24px "Press Start 2P", sans-serif`;
    } else {
      this.textNode.font = `20px "Press Start 2P", sans-serif`;
    }
  },
});

function buttonBlink(button) {
  button.textNode.color = button.textNode.color == color ? altColor : color;
}

function playButtonBlink() {
  buttonBlink(playButton);
}

function restartButtonBlink() {
  buttonBlink(restartButton);
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

function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function isCollidingFromTop(obj1, obj2) {
  if (obj1.dy <= 0) return false;
  const prevY = obj1.y - obj1.dy;
  return prevY + obj1.height <= obj2.y;
}

const gravity = 0.5;
const jumpStrength = -10;
let isJumping = false;
const playerSpeed = 2;
const player = Sprite({
  x: 48,
  y: 368,
  color: playerColor,
  width: 16,
  height: 16,
  dy: 0,
  update() {
    this.dy += gravity;
    this.y += this.dy;

    for (let i = 0; i < platforms.length; i++) {
      if (checkCollision(this, platforms[i]) && isCollidingFromTop(this, platforms[i])) {
        this.y = platforms[i].y - this.height;
        this.dy = 0;
        isJumping = false;
      }
    }

    if (keyPressed('arrowleft')) {
      this.x -= playerSpeed;
      if (this.x < borderThickness) {
        this.x = borderThickness;
      }
    }
    if (keyPressed('arrowright')) {
      this.x += playerSpeed;
      if (this.x + this.width > BASE_WIDTH - borderThickness) {
        this.x = BASE_WIDTH - borderThickness - this.width;
      }
    }

    if (keyPressed('space') && !isJumping) {
      this.dy = jumpStrength;
      isJumping = true;
    }

    // Check if player has fallen off the bottom
    if (this.y > BASE_HEIGHT) {
      gameOver();
    }
  }
});

const PLATFORM_WIDTH = 64;
const PLATFORM_HEIGHT = 16;
const PLATFORM_X_LEFT = 24;
const PLATFORM_X_CENTRE = Math.floor((BASE_WIDTH / 2) - (PLATFORM_WIDTH / 2));
const PLATFORM_X_RIGHT = BASE_WIDTH - 48 - (PLATFORM_WIDTH / 2);
const PLATFORM_Y_GAP = 64;
const platformProps = {
  color,
  width: PLATFORM_WIDTH,
  height: PLATFORM_HEIGHT,
};

let platforms = [];

function createPlatform(x, y) {
  return Sprite({
    ...platformProps,
    x,
    y,
  });
}

function updatePlatforms() {
  // Move existing platforms down
  platforms.forEach(platform => {
    platform.y += platformSpeed;
  });

  // Remove platforms that have fallen off the bottom
  platforms = platforms.filter(platform => platform.y < BASE_HEIGHT);

  // Add new platform if needed
  if (platforms.length < 9) {
    const x = [PLATFORM_X_LEFT, PLATFORM_X_CENTRE, PLATFORM_X_RIGHT][Math.floor(Math.random() * 3)];
    const lastPlatformY = platforms[platforms.length - 1].y;
    platforms.push(createPlatform(x, lastPlatformY - PLATFORM_Y_GAP));
  }

  // Increase platform speed over time
  platformSpeed = Math.min(platformSpeed + platformSpeedIncreaseRate, maxPlatformSpeed);
}

// Score display is white so it's not mixed with the platforms
const scoreText = Text({
  text: 'Score: 0',
  font: '16px "Press Start 2P", sans-serif',
  color: playerColor,
  x: 10,
  y: 10,
});

// Game over screen
const gameOverText = Text({
  text: 'Game Over',
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2 - 64,
  ...menuTextOptions,
});

const finalScoreText = Text({
  text: 'Score: 0',
  ...menuTextOptions,
  font: '16px "Press Start 2P", sans-serif',
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2,
});

const highScoreText = Text({
  text: 'High Score: 0',
  ...menuTextOptions,
  font: '16px "Press Start 2P", sans-serif',
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2 + 32,
});

const restartButton = Button({
  x: BASE_WIDTH / 2,
  y: BASE_HEIGHT / 2 + 96,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: 'Restart?',
    ...menuTextOptions,
    font: '18px "Press Start 2P", sans-serif',
  },
  onDown() {
    clearInterval(restartButtonBlinkId);
    startGame();
  },
});

function startGame() {
  gameState = PLAYING;
  score = 0;
  platformSpeed = 0.5;
  platforms = [
    createPlatform(PLATFORM_X_LEFT, 384),
    createPlatform(PLATFORM_X_CENTRE, 320),
    createPlatform(PLATFORM_X_RIGHT, 256),
    createPlatform(PLATFORM_X_LEFT, 192),
    createPlatform(PLATFORM_X_CENTRE, 128),
    createPlatform(PLATFORM_X_RIGHT, 64),
    createPlatform(PLATFORM_X_LEFT, 0),
    createPlatform(PLATFORM_X_CENTRE, -64),
    createPlatform(PLATFORM_X_RIGHT, -128),
  ];
  player.x = 48;
  player.y = 368;
  player.dy = 0;
}

function gameOver() {
  gameState = GAME_OVER;
  if (score > highScore) {
    highScore = score;
  }
  finalScoreText.text = `Score: ${Math.floor(score)}`;
  highScoreText.text = `High Score: ${Math.floor(highScore)}`;
  restartButtonBlinkId = setInterval(restartButtonBlink, 500);
}

// GAME LOOPS
const mainLoop = GameLoop({
  update: function (dt) {
    if (gameState === PLAYING) {
      player.update();
      updatePlatforms();
      score += dt;
      scoreText.text = `Score: ${Math.floor(score)}`;
    }
  },
  render: function () {
    background.render();
    borders.forEach((border) => border.render());

    if (gameState === MENU) {
      playButton.render();
    } else if (gameState === PLAYING) {
      platforms.forEach(p => p.render());
      player.render();
      scoreText.render();
    } else if (gameState === GAME_OVER) {
      gameOverText.render();
      finalScoreText.render();
      highScoreText.render();
      restartButton.render();
    }
  },
});

// Start the game
mainLoop.start();
playButtonBlinkId = setInterval(playButtonBlink, 500);
