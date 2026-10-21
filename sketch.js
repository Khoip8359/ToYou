// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

const fireworks = [];
let gravity;

function viewportSize() {
  const view = window.visualViewport;
  return {
    w: Math.floor(view ? view.width : windowWidth),
    h: Math.floor(view ? view.height : windowHeight),
  };
}

function setup() {
  const size = viewportSize();
  const canvas = createCanvas(size.w, size.h);
  canvas.style('mix-blend-mode', 'screen');
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function windowResized() {
  const size = viewportSize();
  resizeCanvas(size.w, size.h);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
