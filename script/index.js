const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
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

let lastKey = "";

const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
];

const boundaries = [];
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
map.forEach((row, index) => {
  row.forEach((symbol, y) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * y,
              y: Boundary.height * index,
            },
          })
        );
        break;
    }
  });
});
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  pacman.update();
  pacman.velocity.y = 0;
  pacman.velocity.x = 0;
  if (keys.w.presssed && lastKey === 'w') {
    pacman.velocity.y = -5;
  } else if (keys.a.presssed && lastKey === 'a') {
    pacman.velocity.x = -5;
  } else if (keys.s.presssed && lastKey === 's') {
    pacman.velocity.y = 5;
  } else if (keys.d.presssed && lastKey === 'd') {
    pacman.velocity.x = 5;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.presssed = true;
      lastKey = 'w'
      break;
    case "d":
      keys.d.presssed = true;
      lastKey = 'd'
      break;
    case "s":
      keys.s.presssed = true;
      lastKey = 's'
      break;
    case "a":
      keys.a.presssed = true;
      lastKey = 'a'
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.presssed = false;
      // pacman.velocity.y = 0;
      break;
    case "d":
      keys.d.presssed = false;
      // pacman.velocity.x = 0;
      break;
    case "s":
      keys.s.presssed = false;
      // pacman.velocity.y = 0;
      break;
    case "a":
      keys.a.presssed = false;
      // pacman.velocity.x = 0;
      break;
  }
});
