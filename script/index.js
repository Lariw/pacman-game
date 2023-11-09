const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const scoreElement = document.querySelector(".js-score");

canvas.width = innerWidth;
canvas.height = innerHeight;

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
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
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
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
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

const pacman = new Pacman({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

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
];
let score = null;
let lastKey = "";

const map = [
  ["ctl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "ctr"],
  ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
  ["|", "*", "[]", "[]", "[]", "[]", "[]", "*", "[]", "*", "|"],
  ["|", "*", "*", "*", "[]", "*", "*", "*", "[]", "*", "|"],
  ["|", "*", "[]", "*", "*", "*", "[]", "*", "[]", "*", "|"],
  ["|", "*", "[]", "[]", "[]", "[]", "[]", "*", "[]", "*", "|"],
  ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
  ["|", "*", "[]", "[]", "*", "[]", "[]", "[]", "[]", "*", "|"],
  ["|", "*", "*", "[]", "*", "*", "[]", "*", "*", "*", "|"],
  ["|", "*", "*", "[]", "[]", "*", "*", "*", "[]", "*", "|"],
  ["|", "*", "*", "*", "*", "*", "[]", "*", "[]", "*", "|"],
  ["|", "*", "*", "*", "*", "*", "*", "*", "*", "*", "|"],
  ["cbl", "_", "_", "_", "_", "_", "_", "_", "_", "_", "cbr"],
];

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
let animationID;
function animate() {
  animationID = requestAnimationFrame(animate);
  // console.log(animationID);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let index = foods.length - 1; 0 < index; index--) {
    const food = foods[index];

    food.draw();

    if (
      Math.hypot(
        food.position.x - pacman.position.x,
        food.position.y - pacman.position.y
      ) <
      food.radius + pacman.radius
    ) {
      // console.log("touching");
      foods.splice(index, 1);
      score += 10;
      scoreElement.innerText = score;
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

    if (
      Math.hypot(
        enemy.position.x - pacman.position.x,
        enemy.position.y - pacman.position.y
      ) <
      enemy.radius + pacman.radius
    ) {
      cancelAnimationFrame(animationID);
      alert("loooose");
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
      // console.log({ pathways });
      const direction = pathways[Math.floor(Math.random() * pathways.length)];
      // console.log(direction);

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

  if (keys.w.presssed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...pacman,
            velocity: {
              x: 0,
              y: -5,
            },
          },
          rectangle: boundary,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = -5;
      }
    }
  } else if (keys.a.presssed && lastKey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...pacman,
            velocity: {
              x: -5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = -5;
      }
    }
  } else if (keys.s.presssed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...pacman,
            velocity: {
              x: 0,
              y: 5,
            },
          },
          rectangle: boundary,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = 5;
      }
    }
  } else if (keys.d.presssed && lastKey === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...pacman,
            velocity: {
              x: 5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = 5;
      }
    }
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.presssed = true;
      lastKey = "w";
      break;
    case "d":
      keys.d.presssed = true;
      lastKey = "d";
      break;
    case "s":
      keys.s.presssed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.presssed = true;
      lastKey = "a";
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.presssed = false;

      break;
    case "d":
      keys.d.presssed = false;

      break;
    case "s":
      keys.s.presssed = false;

      break;
    case "a":
      keys.a.presssed = false;

      break;
  }
});
