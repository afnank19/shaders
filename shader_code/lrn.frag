precision mediump float;

uniform vec2 u_resolution;  // Screen resolution
uniform float u_time;
uniform vec2 u_mouse;

vec3 palette( in float t )
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.10, 0.20);

    return a + b*cos( 6.283185*(c*t+d) );
}


void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy )/u_resolution.y;
    vec2 uv0 = st;
    vec3 finalColor = vec3(.0);


    st = fract(st * .8) - 0.5;
    vec3 col = palette(length(uv0) + u_time / 2.);

    float d = abs(length(st ) - 0.5) - 0.01;
    float e = length(st) - 0.5;
    //d -= e;
    // d = smoothstep(0.0, 0.9, d);

    finalColor += col * d;


	gl_FragColor = vec4(finalColor,1.0);
}