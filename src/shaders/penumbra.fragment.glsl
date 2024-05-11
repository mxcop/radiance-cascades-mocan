uniform vec2 size;

in vec2 tuv;

const float PI = 3.14159265;
const float TAU = 2.0 * PI;

const int NUM_SAMPLES = 360;

const vec2 LIGHT_POS = vec2(16.0, 32.0);
const float LIGHT_RADIUS = 12.0;
const vec2 OCCLUDER_POS = vec2(40.0, 32.0);
const float OCCLUDER_RADIUS = 5.0;

void main() {
    vec2 pixel_coord = tuv * size;
    vec2 ro = pixel_coord;
    float ps = 2.0 / size.y;
    
    /* Evaluate radiance */
    float radiance = 0.0;
    for(int i = 0; i < NUM_SAMPLES; i++) {
        /* Ray direction */
        float angle = TAU * (float(i) / float(NUM_SAMPLES));
        vec2 rd = vec2(cos(angle), sin(angle));

        float light_scalar_proj = dot(LIGHT_POS - ro, rd);
        vec2 proj_light_pos = light_scalar_proj * rd + ro;

        float occluder_scalar_proj = dot(OCCLUDER_POS - ro, rd);
        vec2 proj_occluder_pos = occluder_scalar_proj * rd + ro;

        /* Detect hit */
        float contribution = 
            max(
                max(
                    step(occluder_scalar_proj, 0.0),
                    step(light_scalar_proj, occluder_scalar_proj)), 
                    step(OCCLUDER_RADIUS, distance(proj_occluder_pos, OCCLUDER_POS)
                )
            );

        contribution *= 
            max(
                step(0.0, light_scalar_proj) * step(distance(proj_light_pos, LIGHT_POS), LIGHT_RADIUS), 
                smoothstep(LIGHT_RADIUS+ps, LIGHT_RADIUS-ps, distance(ro, LIGHT_POS))
            );

        radiance += contribution;
    }
    radiance /= float(NUM_SAMPLES);

    vec3 color = vec3(1.0);
    
    /* Draw occluder shape */
    radiance = mix(radiance, 1.0, smoothstep(OCCLUDER_RADIUS+ps, OCCLUDER_RADIUS-ps, distance(pixel_coord, OCCLUDER_POS)));
    color = mix(color, vec3(0.0), smoothstep(OCCLUDER_RADIUS+ps, OCCLUDER_RADIUS-ps, distance(pixel_coord, OCCLUDER_POS)));

    /* Tonemapping */
    radiance = pow(radiance, 1./2.2);

    gl_FragColor = vec4(color, radiance);
}
