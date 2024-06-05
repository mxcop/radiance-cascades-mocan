uniform int dir_count;
uniform vec2 size;

in vec2 tuv;

const float PI = 3.14159265;
const float TAU = 2.0 * PI;

const vec2 LIGHT_POS = vec2(2.0, 32.0);
const float LIGHT_RADIUS = 12.0;
const vec2 OCCLUDER_POS = vec2(20.0, 16.0);
const float OCCLUDER_RADIUS = 16.0;
const float THICKNESS = 1.0;

float aabb_intersect(vec2 rayOrigin, vec2 rayDir, vec2 boxMin, vec2 boxMax) {
    vec2 tMin = (boxMin - rayOrigin) / rayDir;
    vec2 tMax = (boxMax - rayOrigin) / rayDir;
    vec2 t1 = min(tMin, tMax);
    vec2 t2 = max(tMin, tMax);
    float tNear = max(max(t1.x, t1.y), 0.0);
    float tFar = min(t2.x, t2.y);
    if (tNear < tFar) return tNear;
    return -1.0;
}

float screen_dist(in vec2 p, in vec2 pos, in vec2 size, in float r)
{
    size -= r;
    vec2 d = abs(p-pos)-size;
    return min(0.0, max(d.x, d.y))+length(max(d,0.0))-r;
}

void main() {
    vec2 pixel_coord = tuv * size;
    vec2 ro = pixel_coord;
    float ps = 2.0 / size.y;
    
    /* Evaluate radiance */
    float radiance = 0.0;
    for(int i = 0; i < dir_count; i++) {
        /* Ray direction */
        float angle = TAU * ((float(i) + 0.5) / float(dir_count));
        vec2 rd = vec2(cos(angle), sin(angle));

        /* Detect hit */
        float light_dist = aabb_intersect(ro, rd, LIGHT_POS - vec2(THICKNESS, LIGHT_RADIUS), LIGHT_POS + vec2(THICKNESS, LIGHT_RADIUS));
        float occluder_dist = aabb_intersect(ro, rd, OCCLUDER_POS - vec2(THICKNESS, OCCLUDER_RADIUS), OCCLUDER_POS + vec2(THICKNESS, OCCLUDER_RADIUS));

        /* Inside occluder */ 
        if (occluder_dist == 0.0) {
            radiance = -1.0;
            break;
        }
        /* Inside light */ 
        if (light_dist == 0.0) {
            radiance = float(dir_count) * 2.0;
            break;
        }

        /* Light hit */
        if (light_dist > 0.0 && (light_dist < occluder_dist || occluder_dist < 0.0)) {
            radiance += 2.0;
        }
    }

    /* Draw the occluder */
    if (radiance < 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    radiance /= float(dir_count);

    /* Edge fade */
    float sd = min(-screen_dist(ro, vec2(size / 2.0), size / 2.0, 8.0) * 0.5, 1.0);
    
    gl_FragColor = vec4(vec3(1.0, 0.95, 0.9), radiance * sd);
}
