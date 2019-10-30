// module aliases
var Engine = Matter.Engine,
// Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;

var checkbox;
var schedule;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  world.gravity.x = -0.5;
  world.gravity.y = 0;

  schedule = new Schedule(10);

  checkbox = createCheckbox('Radar Enabled', true);
  checkbox.changed(myCheckedEvent);

}

function myCheckedEvent() {
  if (this.checked()) {
    schedule.enable_radar();
  } else {
    schedule.disable_radar();
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    schedule.add_bullet(mouseX, mouseY);
  }
}

// Background: 32, 33, 36
// Grid: 60, 64, 67
// Blue: 53, 160, 212
// Green: 80, 185, 135
// Text: 154, 160, 166

function draw() {
  background(32, 33, 36);

  Engine.update(engine);

  schedule.update();
  schedule.show();
}