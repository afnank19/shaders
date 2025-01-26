#define t u_time
precision mediump float;

uniform vec2 u_resolution;  // Screen resolution
uniform float u_time;
uniform vec2 u_mouse;

vec3 palette( in float t )
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.99, 0.11, 0.17);

    return a + b*cos( 6.283185*(c*t+d) );
}

float sdRoundedX( in vec2 p, in float w, in float r )
{
    p = abs(p);
    return length(p-min(p.x+p.y,w)*0.5) - r;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy )/u_resolution.y;
    vec2 uv0 = st;
    vec3 fc = vec3(.0);

    st = rotate2d( (u_time)/6. ) * st;


    for (float i = 0.0; i < 2.0; ++i) {
        st = fract(st * 1.25) - 0.5;
        vec3 col = palette(length(uv0) + t / 2.0 + i*.4);
        float d = sdRoundedX(st * 1.5, 1.0, 0.0) ;
        d =abs(sin(d * 8. + u_time) / 6.);
        d = 0.005/d;
        d = pow(d, 1.1);
        d = smoothstep(0.0, 0.1, d);
        // float e = 0.005 / d;
        // d += e;
        float e = length(uv0) - 0.5;
        e = smoothstep(0.1, 0.7, e);
        e = 1.0 - e;
        d *= e;

        fc += col * d;
    }


    gl_FragColor = vec4(fc, 1.0);
}