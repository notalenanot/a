let n = 500;
let spiral = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(200, 255, 255, 80);
}

function draw() {
  background(10, 10, 30, 15);
  for (let i = 0; i < n; i++) {
    let t = (i / n) * TWO_PI + spiral;
    let r = i * 0.8;
    ellipse(width / 2 + r * cos(t), height / 2 + r * sin(t), 3, 3);
  }
  spiral += 0.002;
}
