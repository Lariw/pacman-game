let animationID;
let isPacmanAlive = true;
let score = null;
const startGame = (level) => {
  let fallSpeed = 1;

  const drawBackground = () => {
    boundaries.forEach((boundary) => {
      boundary.draw();
    });

    enemies.forEach((enemy) => {
      enemy.draw();
    });
  };

  function fallAnimation() {
    drawBackground();
    c.clearRect(
      pacman.position.x - pacman.radius - 1,
      pacman.position.y - pacman.radius - 1,
      pacman.radius * 2 + 2,
      pacman.radius * 2 + 2
    );
    pacman.position.y += fallSpeed;
    pacman.rotation = Math.PI / 2;
    pacman.draw();

    if (pacman.position.y < canvas.height) {
      requestAnimationFrame(fallAnimation);
    }
  }

  pauseGame.addEventListener("click", () => {
    cancelAnimationFrame(animationID);

    pauseGame.style.display = "none";
    playGame.style.display = "block";
  });

  playGame.addEventListener("click", () => {
    pauseGame.style.display = "block";
    playGame.style.display = "none";
    animate();
  });

  let keyUp;
  let keyDown;
  let keyLeft;
  let keyRight;

  const keys = {
    w: {
      presssed: false,
    },
    s: {
      presssed: false,
    },
    a: {
      presssed: false,
    },
    d: {
      presssed: false,
    },
  };

  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");
  const scoreElement = document.querySelector(".js-score");

  if (keyControlWSAD.checked) {
    keyUp = "w";
    keyDown = "s";
    keyLeft = "a";
    keyRight = "d";
  } else if (keyControlArrow.checked) {
    keyUp = "ArrowUp";
    keyDown = "ArrowDown";
    keyLeft = "ArrowLeft";
    keyRight = "ArrowRight";
  }

  canvas.width = 440;
  canvas.height = 520;

  class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position, image }) {
      this.position = position;
      this.width = 40;
      this.height = 40;
      this.image = image;
    }
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  class Pacman {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.radius = 15;
      this.radians = 0.75;
      this.openRate = 0.02;
      this.rotation = 0;
    }
    draw() {
      c.save();
      c.translate(this.position.x, this.position.y);
      c.rotate(this.rotation);
      c.translate(-this.position.x, -this.position.y);
      c.beginPath();
      c.arc(
        this.position.x,
        this.position.y,
        this.radius,
        this.radians,
        Math.PI * 2 - this.radians
      );
      c.lineTo(this.position.x, this.position.y);
      c.fillStyle = "yellow";
      c.fill();
      c.closePath();
      c.restore();
    }
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.radians < 0 || this.radians > 0.75)
        this.openRate = -this.openRate;

      this.radians += this.openRate;
    }
  }

  class Enemy {
    static speed = 1;
    constructor({ position, velocity, color = "red" }) {
      this.position = position;
      this.velocity = velocity;
      this.color = color;
      this.radius = 15;
      this.prevCollisions = [];
      this.speed = 1;
      this.scared = false;
    }
    draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.scared ? "blue" : this.color;
      c.fill();
      c.closePath();
    }
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  class Food {
    constructor({ position }) {
      this.position = position;
      this.radius = 3;
    }
    draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = "white";
      c.fill();
      c.closePath();
    }
  }

  class PowerUP {
    constructor({ position }) {
      this.position = position;
      this.radius = 9;
    }
    draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = "purple";
      c.fill();
      c.closePath();
    }
  }

  const pacman = new Pacman({
    position: {
      x: Boundary.width + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
      x: 3,
      y: 3,
    },
  });

  const powerUps = [];
  const foods = [];
  const boundaries = [];
  const enemies = [
    new Enemy({
      position: {
        x: Boundary.width * 6 + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: {
        x: Enemy.speed,
        y: 0,
      },
    }),

    new Enemy({
      position: {
        x: Boundary.width * 6 + Boundary.width / 2,
        y: Boundary.height * 3 + Boundary.height / 2,
      },
      velocity: {
        x: Enemy.speed,
        y: 0,
      },
    }),
  ];

  let lastKey = "";

  let map = [
    ["ctl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "ctr"],
    ["|", "", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "[]", "[]", "[]", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "*", "*", "[]", "*", "*", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "*", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "[]", "[]", "[]", "[]", "*", "[]", "*", "|"],
    ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "[]", "*", "[]", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "[]", "p", "*", "*", "[]", "*", "*", "*", "|"],
    ["|", "*", "*", "*", "[]", "*", "*", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["cbl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "cbr"],
  ];

  let map2 = [
    ["ctl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "ctr"],
    ["|", "", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "[]", "[]", "[]", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "*", "*", "[]", "*", "*", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "*", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "[]", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "[]", "p", "[]", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "[]", "*", "*", "*", "[]", "*", "*", "*", "|"],
    ["|", "*", "*", "*", "[]", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "[]", "[]", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["cbl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "cbr"],
  ];

  let map3 = [
    ["ctl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "ctr"],
    ["|", "", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "*", "[]", "[]", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "*", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "p", "*", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "[]", "*", "*", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "[]", "[]", "[]", "*", "|"],
    ["|", "*", "[]", "*", "[]", "*", "*", "*", "*", "*", "|"],
    ["|", "*", "[]", "*", "*", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "[]", "[]", "[]", "*", "[]", "*", "[]", "*", "|"],
    ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
    ["cbl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "cbr"],
  ];

  if (level == 1) {
  } else if (level == 2) {
    map = map2;
  } else if (level == 3) {
    map = map3;
  }

  const createImage = (src) => {
    const image = new Image();
    image.src = src;
    return image;
  };

  map.forEach((row, index) => {
    row.forEach((symbol, y) => {
      switch (symbol) {
        case "|":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeVertical.png"),
            })
          );
          break;
        case "_":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeHorizontal.png"),
            })
          );
          break;
        case "-":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeVertical.png"),
            })
          );
          break;

        case "ctr":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeCorner2.png"),
            })
          );
          break;
        case "ctl":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeCorner1.png"),
            })
          );
          break;
        case "cbl":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeCorner4.png"),
            })
          );
          break;
        case "cbr":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/pipeCorner3.png"),
            })
          );
          break;
        case "[]":
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * y,
                y: Boundary.height * index,
              },
              image: createImage("../images/block.png"),
            })
          );
          break;

        case "*":
          foods.push(
            new Food({
              position: {
                x: y * Boundary.width + Boundary.width / 2,
                y: index * Boundary.height + Boundary.height / 2,
              },
            })
          );
          break;
        case "p":
          powerUps.push(
            new PowerUP({
              position: {
                x: y * Boundary.width + Boundary.width / 2,
                y: index * Boundary.height + Boundary.height / 2,
              },
            })
          );
          break;
      }
    });
  });

  const circleCollidesWithRectangle = ({ circle, rectangle }) => {
    const padding = Boundary.width / 2 - circle.radius - 1;
    return (
      circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x - padding &&
      circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y - padding &&
      circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width + padding
    );
  };
  //let animationID;
  function animate() {
    if (animationID == 5) {
      cancelAnimationFrame(animationID);
      beforeStartSound.play();
      setTimeout(() => {
        animationID = requestAnimationFrame(animate);
      }, 4000);
    } else {
      animationID = requestAnimationFrame(animate);
    }
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = powerUps.length - 1; 0 <= index; index--) {
      const powerUp = powerUps[index];
      powerUp.draw();

      if (
        Math.hypot(
          powerUp.position.x - pacman.position.x,
          powerUp.position.y - pacman.position.y
        ) <
        powerUp.radius + pacman.radius
      ) {
        powerUps.splice(index, 1);
        fruitSound.play();
        enemies.forEach((enemy) => {
          enemy.scared = true;

          setTimeout(() => {
            enemy.scared = false;
          }, 5000);
        });

        cutSceneSound.play();
      }
    }

    for (let index = foods.length - 1; 0 <= index; index--) {
      const food = foods[index];

      food.draw();

      if (
        Math.hypot(
          food.position.x - pacman.position.x,
          food.position.y - pacman.position.y
        ) <
        food.radius + pacman.radius
      ) {
        foods.splice(index, 1);
        score += 10;
        scoreElement.innerText = score;
        chompSound.play();
      }
    }

    boundaries.forEach((boundary) => {
      boundary.draw();

      if (
        circleCollidesWithRectangle({
          circle: pacman,
          rectangle: boundary,
        })
      ) {
        pacman.velocity.x = 0;
        pacman.velocity.y = 0;
      }
    });

    pacman.update();

    enemies.forEach((enemy) => {
      enemy.update();

      for (let index = enemies.length - 1; 0 <= index; index--) {
        const enemy = enemies[index];
        if (
          Math.hypot(
            enemy.position.x - pacman.position.x,
            enemy.position.y - pacman.position.y
          ) <
          enemy.radius + pacman.radius
        ) {
          if (enemy.scared) {
            enemies.splice(index, 1);
            score += 100;
            scoreElement.innerText = score;
            ghostAudio.play();
          } else {
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
            isPacmanAlive = false;
            collisionHandled = true;
            fallAnimation();
            cancelAnimationFrame(animationID);
          }
        }
      }

      const collisions = [];
      boundaries.forEach((boundary) => {
        if (
          !collisions.includes("right") &&
          circleCollidesWithRectangle({
            circle: {
              ...enemy,
              velocity: {
                x: enemy.speed,
                y: 0,
              },
            },
            rectangle: boundary,
          })
        ) {
          collisions.push("right");
        }
        if (
          !collisions.includes("left") &&
          circleCollidesWithRectangle({
            circle: {
              ...enemy,
              velocity: {
                x: -enemy.speed,
                y: 0,
              },
            },
            rectangle: boundary,
          })
        ) {
          collisions.push("left");
        }
        if (
          !collisions.includes("up") &&
          circleCollidesWithRectangle({
            circle: {
              ...enemy,
              velocity: {
                x: 0,
                y: -enemy.speed,
              },
            },
            rectangle: boundary,
          })
        ) {
          collisions.push("up");
        }
        if (
          !collisions.includes("down") &&
          circleCollidesWithRectangle({
            circle: {
              ...enemy,
              velocity: {
                x: 0,
                y: enemy.speed,
              },
            },
            rectangle: boundary,
          })
        ) {
          collisions.push("down");
        }
      });
      if (collisions.length > enemy.prevCollisions.length) {
        enemy.prevCollisions = collisions;
      }

      if (JSON.stringify(collisions) !== JSON.stringify(enemy.prevCollisions)) {
        if (enemy.velocity.x > 0) {
          enemy.prevCollisions.push("right");
        } else if (enemy.velocity.x < 0) {
          enemy.prevCollisions.push("left");
        } else if (enemy.velocity.y < 0) {
          enemy.prevCollisions.push("up");
        } else if (enemy.velocity.y > 0) {
          enemy.prevCollisions.push("down");
        }

        const pathways = enemy.prevCollisions.filter((collision) => {
          return !collisions.includes(collision);
        });

        const direction = pathways[Math.floor(Math.random() * pathways.length)];

        switch (direction) {
          case "down":
            enemy.velocity.y = enemy.speed;
            enemy.velocity.x = 0;
            break;

          case "up":
            enemy.velocity.y = -enemy.speed;
            enemy.velocity.x = 0;
            break;

          case "left":
            enemy.velocity.y = 0;
            enemy.velocity.x = -enemy.speed;
            break;

          case "right":
            enemy.velocity.y = 0;
            enemy.velocity.x = enemy.speed;
            break;
        }

        enemy.prevCollisions = [];
      }
    });
    if (collisionHandled) {
      collisionHandled = false;
      showGameMessage("lose");
      deathSound.play();
    }

    if (keys.w.presssed && lastKey === keyUp) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...pacman,
              velocity: {
                x: 0,
                y: -2,
              },
            },
            rectangle: boundary,
          })
        ) {
          pacman.velocity.y = 0;
          break;
        } else {
          pacman.velocity.y = -2;
        }
      }
    } else if (keys.a.presssed && lastKey === keyLeft) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...pacman,
              velocity: {
                x: -2,
                y: 0,
              },
            },
            rectangle: boundary,
          })
        ) {
          pacman.velocity.x = 0;
          break;
        } else {
          pacman.velocity.x = -2;
        }
      }
    } else if (keys.s.presssed && lastKey === keyDown) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...pacman,
              velocity: {
                x: 0,
                y: 2,
              },
            },
            rectangle: boundary,
          })
        ) {
          pacman.velocity.y = 0;
          break;
        } else {
          pacman.velocity.y = 2;
        }
      }
    } else if (keys.d.presssed && lastKey === keyRight) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...pacman,
              velocity: {
                x: 2,
                y: 0,
              },
            },
            rectangle: boundary,
          })
        ) {
          pacman.velocity.x = 0;
          break;
        } else {
          pacman.velocity.x = 2;
        }
      }
    }

    if (foods.length === 0) {
      cancelAnimationFrame(animationID);
      showGameMessage("win");
      winningGameSound.play();
    }

    if (pacman.velocity.x > 0) {
      pacman.rotation = 0;
    } else if (pacman.velocity.x < 0) {
      pacman.rotation = Math.PI;
    } else if (pacman.velocity.y < 0) {
      pacman.rotation = Math.PI * 1.5;
    } else if (pacman.velocity.y > 0) {
      pacman.rotation = Math.PI / 2;
    }
  }

  animate();

  addEventListener("keydown", ({ key }) => {
    switch (key) {
      case keyUp:
        keys.w.presssed = true;
        lastKey = keyUp;
        break;
      case keyRight:
        keys.d.presssed = true;
        lastKey = keyRight;
        break;
      case keyDown:
        keys.s.presssed = true;
        lastKey = keyDown;
        break;
      case keyLeft:
        keys.a.presssed = true;
        lastKey = keyLeft;
        break;
    }
  });

  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case keyUp:
        keys.w.presssed = false;

        break;
      case keyRight:
        keys.d.presssed = false;

        break;
      case keyDown:
        keys.s.presssed = false;

        break;
      case keyLeft:
        keys.a.presssed = false;

        break;
    }
  });
};
