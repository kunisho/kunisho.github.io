var sample;

function preload() {
  sample = loadSound('src/my-drumroll.wav');
}

function setup() {
  createCanvas(320, 240);
  sample.loop();
}

function draw() {
  background(200);
}
