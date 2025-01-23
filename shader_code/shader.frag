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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    // vec2 normalized_mouse = u_mouse / u_resolution;

	// gl_FragColor = vec4(st.x,normalized_mouse.x,normalized_mouse.y,1.0);
    // vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy )/u_resolution.y;

    st.x *= 6.14;

    float y = abs(sin(st.x + u_time));

    vec3 color = vec3(y, 0.0, 0.);

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.9,1.0,0.5);

    float circle = length(vec2(st.x, st.y * 6.));
    circle = 1. - circle;

	gl_FragColor = vec4(color,1.0);
}

