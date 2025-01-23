let myShader;

const CANVAS_SIZE = 700;

function preload() {
  // Load the fragment shader
  myShader = loadShader(
    "./shader_code/shader.vert",
    "./shader_code/shader.frag"
  );
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL); // Use WEBGL mode for shaders
  noStroke(); // Optional: remove outlines
}

function draw() {
  shader(myShader); // Apply the shader

  // Pass the resolution to the shader as a uniform
  myShader.setUniform("u_resolution", [CANVAS_SIZE, CANVAS_SIZE]);
  myShader.setUniform("u_time", millis() / 1000.0);
  myShader.setUniform("u_mouse", [mouseX, mouseY]);

  // Draw a rectangle to fill the canvas
  rect(0 - width, 0 - height, CANVAS_SIZE * 2, CANVAS_SIZE * 2);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
