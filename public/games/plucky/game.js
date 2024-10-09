const { collides, init, initKeys, initPointer, keyPressed, Button, GameLoop, Sprite, Text } = kontra;

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
const platformSpeedIncreaseRate = 0.0005;

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Mobile control buttons
const mobileButtonSize = 36;
const mobileButtonColor = 'rgba(255, 255, 255, 0.5)';
const mobileButtonTextColor = 'black';

const leftButton = Button({
  x: 32,
  y: BASE_HEIGHT - mobileButtonSize - 16,
  width: mobileButtonSize,
  height: mobileButtonSize,
  color: mobileButtonColor,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: '←',
    color: mobileButtonTextColor,
    font: '24px Arial, sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  },
});

const rightButton = Button({
  x: mobileButtonSize + 64,
  y: BASE_HEIGHT - mobileButtonSize - 16,
  width: mobileButtonSize,
  height: mobileButtonSize,
  color: mobileButtonColor,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: '→',
    color: mobileButtonTextColor,
    font: '24px Arial, sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  },
});

const jumpButton = Button({
  x: BASE_WIDTH - mobileButtonSize - 16,
  y: BASE_HEIGHT - mobileButtonSize - 16,
  width: mobileButtonSize,
  height: mobileButtonSize,
  color: mobileButtonColor,
  anchor: { x: 0.5, y: 0.5 },
  text: {
    text: '↑',
    align: 'center',
    color: mobileButtonTextColor,
    font: '24px Arial, sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  },
});

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

function isCollidingFromTop(obj1, obj2) {
  if (obj1.dy <= 0) return false;
  const prevY = obj1.y - obj1.dy;
  return prevY + obj1.height <= obj2.y;
}

function isCollidingFromBottom(obj1, obj2) {
  if (obj1.dy >= 0) return false;
  const prevY = obj1.y - obj1.dy;
  return prevY >= obj2.y + obj2.height;
}

function isCollidingHorizontally(obj1, obj2, direction) {
  const isMovingRight = direction > 0;
  const isMovingLeft = direction < 0;

  if (isMovingRight) {
    return obj1.x + obj1.width + direction >= obj2.x &&
      obj1.x < obj2.x &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height;
  } else if (isMovingLeft) {
    return obj1.x + direction <= obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x + obj2.width &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height;
  }

  return false;
}

const gravity = 0.5;
const jumpStrength = -10;
let isJumping = false;
const playerSpeed = 2.5;
const player = Sprite({
  x: 48,
  y: 368,
  color: playerColor,
  width: 16,
  height: 16,
  dy: 0,
  update() {
    this.dy += gravity;

    // Vertical movement and collision check
    let newY = this.y + this.dy;

    for (let i = 0; i < platforms.length; i++) {
      if (collides(this, platforms[i])) {
        if (isCollidingFromTop(this, platforms[i])) {
          newY = platforms[i].y - this.height; // Align player to the top of the platform
          this.dy = 0;
          isJumping = false;
        } else if (isCollidingFromBottom(this, platforms[i])) {
          newY = platforms[i].y + platforms[i].height;
          this.dy = 0;
        }
      }
    }

    this.y = newY;

    // Horizontal movement and collision check
    let newX = this.x;
    let horizontalMovement = 0;

    if (keyPressed('arrowleft') || (isMobile && leftButton.pressed)) {
      horizontalMovement = -playerSpeed;
    }
    if (keyPressed('arrowright') || (isMobile && rightButton.pressed)) {
      horizontalMovement = playerSpeed;
    }

    if (horizontalMovement !== 0) {
      let canMove = true;
      for (let i = 0; i < platforms.length; i++) {
        if (isCollidingHorizontally(this, platforms[i], horizontalMovement)) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        newX += horizontalMovement;
      }
    }

    // Ensure player stays within game borders
    newX = Math.max(borderThickness, Math.min(newX, BASE_WIDTH - borderThickness - this.width));
    this.x = newX;

    if ((keyPressed('space') || (isMobile && jumpButton.pressed)) && !isJumping) {
      this.dy = jumpStrength;
      isJumping = true;
    }

    // Check if player has fallen off the bottom
    if (this.y > BASE_HEIGHT) {
      gameOver();
    }
  }
});

// PLATFORM CONFIGURATION
const PLATFORM_HEIGHT = 16;
const PLATFORM_Y_GAP = 64;
const GAP_MIN = 30;
const GAP_MAX = 60;
const GAP_OPTIONS = [30, 60];

// Base Platform Properties
const platformProps = {
  color,
  height: PLATFORM_HEIGHT,
};

function createPlatformSegment(x, y, width) {
  return Sprite({
    ...platformProps,
    x,
    y,
    width,
  });
}

function createFullPlatform(y) {
  return createPlatformSegment(borderThickness, y, BASE_WIDTH - 2 * borderThickness);
}

function createPlatformWithGap(y) {
  const gapSize = GAP_OPTIONS[Math.floor(Math.random() * GAP_OPTIONS.length)];
  const maxGapStart = (BASE_WIDTH - 2 * borderThickness) - gapSize;
  const gapStart = borderThickness + Math.floor(Math.random() * (maxGapStart + 1));

  const leftWidth = gapStart - borderThickness;
  const rightWidth = (BASE_WIDTH - 2 * borderThickness) - leftWidth - gapSize;

  const segments = [];

  if (leftWidth > 0) {
    segments.push(createPlatformSegment(borderThickness, y, leftWidth));
  }

  if (rightWidth > 0) {
    segments.push(createPlatformSegment(borderThickness + leftWidth + gapSize, y, rightWidth));
  }

  return segments;
}

let platforms = [];

// Score display
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

  // Initialize Platforms with the First Full Platform
  platforms = [
    createFullPlatform(384),
  ];

  // Generate Additional Platforms with Gaps
  for (let i = 1; i < 9; i++) { // Total 9 platforms (1 full + 8 with gaps)
    const y = 384 - (PLATFORM_Y_GAP * i);
    const platformSegments = createPlatformWithGap(y);
    platforms.push(...platformSegments);
  }

  // Reset Player Position
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

function updatePlatforms() {
  // Move existing platforms down
  platforms.forEach(platform => {
    platform.y += platformSpeed;
  });

  // Remove platforms that have fallen off the bottom
  platforms = platforms.filter(platform => platform.y < BASE_HEIGHT);

  // Add new platform if needed
  if (platforms.length < 9 * 2) {
    const lastPlatformY = platforms.length > 0 ? platforms[platforms.length - 1].y : 384;
    const newY = lastPlatformY - PLATFORM_Y_GAP;
    const newPlatformSegments = createPlatformWithGap(newY);
    platforms.push(...newPlatformSegments);
  }

  // Increase platform speed over time
  platformSpeed = Math.min(platformSpeed + platformSpeedIncreaseRate, maxPlatformSpeed);
}

// GAME LOOPS
const mainLoop = GameLoop({
  update: function (dt) {
    if (gameState === PLAYING) {
      player.update();
      updatePlatforms();
      score += dt;
      scoreText.text = `Score: ${Math.floor(score)}`;

      // Update mobile buttons
      if (isMobile) {
        leftButton.update();
        rightButton.update();
        jumpButton.update();
      }
    }
  },
  render: function () {
    background.render();

    if (gameState === MENU) {
      playButton.render();
    } else if (gameState === PLAYING) {
      borders.forEach((border) => border.render());
      platforms.forEach(p => p.render());
      player.render();
      scoreText.render();

      // Render mobile buttons
      if (isMobile) {
        leftButton.render();
        rightButton.render();
        jumpButton.render();
      }
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
playButtonBlinkId = setInterval(playButtonBlink, 500); // Make play button blink
window.focus();
