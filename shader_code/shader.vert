// Default precision for floating-point numbers
precision mediump float;

// Vertex attributes provided by p5.js
attribute vec3 aPosition;

// Uniforms passed from p5.js (like transformations)
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    // Transform the vertex position using the projection and model-view matrices
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
