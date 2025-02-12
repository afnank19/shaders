precision mediump float;

uniform vec2 u_resolution;  // Screen resolution
uniform float u_time;
uniform vec2 u_mouse;

vec3 red() {
    return vec3(1.0,0.0,0.0);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.009, pct, st.y) -
          smoothstep( pct, pct+0.009, st.y);
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

vec3 palette( in float t )
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.10, 0.20);

    return a + b*cos( 6.283185*(c*t+d) );
}

void main() {
    // vec2 st = gl_FragCoord.xy/u_resolution;
    // vec2 normalized_mouse = u_mouse / u_resolution;

	// gl_FragColor = vec4(st.x,normalized_mouse.x,normalized_mouse.y,1.0);
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy )/u_resolution.y;
    vec2 uv0 = st;
    vec3 finalColor = vec3(0.);

    // st.x *= 6.14;

    for (float i = 0.; i < 3.0; i++) {
        st = fract(st * 1.5) - 0.5;
        vec3 col = palette(length(uv0 * 1.5) + i*.4 + u_time / 2.);
        // float d = length(vec2(st.x, st.y));
        float d = sdCircle(st, 0.5 );
        // float d = sdBox(st, vec2(0.5, 0.5)) - 0.1;
    
        d = abs(sin(d * 8. + u_time) / 8.);
        d = 0.02/d;
        d = pow(d, 1.1);
        // d = smoothstep(0.0, 0.1, d );
        // d = 1. - d;

        finalColor += col * d;
    }

	gl_FragColor = vec4(finalColor,1.0);
}

