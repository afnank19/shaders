let myShader;

const CANVAS_SIZE = 700;

function preload() {
  // Load the fragment shader
  myShader = loadShader("./shader_code/shader.vert", "./shader_code/blub.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Use WEBGL mode for shaders
  noStroke(); // Optional: remove outlines
}

function draw() {
  shader(myShader); // Apply the shader

  // Pass the resolution to the shader as a uniform
  myShader.setUniform("u_resolution", [windowWidth, windowHeight]);
  myShader.setUniform("u_time", millis() / 1000.0);
  myShader.setUniform("u_mouse", [mouseX, mouseY]);

  // Draw a rectangle to fill the canvas
  rect(0 - windowWidth, 0 - windowHeight, windowWidth * 2, windowHeight * 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
