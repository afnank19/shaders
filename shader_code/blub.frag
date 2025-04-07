#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
// float random (in vec2 st) {
//     return fract(sin(dot(st.xy,
//                          vec2(12.9898,78.233)))
//                  * 43758.5453123);
// }

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
// float noise (in vec2 st) {
//     vec2 i = floor(st);
//     vec2 f = fract(st);

//     // Four corners in 2D of a tile
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     // Smooth Interpolation

//     // Cubic Hermine Curve.  Same as SmoothStep()
//     vec2 u = f*f*(3.0-2.0*f);
//     // u = smoothstep(0.,1.,f);

//     // Mix 4 coorners percentages
//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

float noise2(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

vec3 palette( in float t )
{
    vec3 a = vec3(0.70, 0.60, 0.80);
    vec3 b = vec3(0.30, 0.20, 0.40);
    vec3 c = vec3(1.00, 1.00, 1.00);
    vec3 d = vec3(0.90, 0.10, 0.40);

    return a + b*cos( 6.283185*(c*t+d) );
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,
                    .5+b*.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

void main() {
    vec2 st =(2.0 * gl_FragCoord.xy - u_resolution.xy )/u_resolution.y;
    vec2 uv0 = st;
    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*1.25);

    float pattern = pos.x;

    pos = rotate2d( noise2(pos) ) * pos; // rotate the space
    pattern = lines(pos,.25); // draw lines

    // Use the noise function
    float n = noise2(vec2(pos.x - u_time / 12. , pos.y));

    float b =   noise2(pos + u_time / 16.)*.5+.5;
    vec3 col = palette(b + n * 2. - u_time / 16.);

    // col += smoothstep(.15,.2,noise2(pos*1.5));
    // col -= smoothstep(.35,.4,noise(pos*1.5));
    float e = length(uv0) - 0.5;
    e = smoothstep(0.1, 0.7, e / 2.);
    e = 1.0 - e / 1.1;

    // col -= pattern;
    // col += col / 2.;
    col *= e;

    gl_FragColor = vec4(col, 1.0);
}