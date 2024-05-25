uniform int dir_count;
uniform vec2 size;

in vec2 tuv;

const float PI = 3.14159265;
const float TAU = 2.0 * PI;

const vec2 LIGHT_POS = vec2(42.0, 42.0);
const float LIGHT_RADIUS = 3.0;
const vec2 OCCLUDER_POS = vec2(32.0, 32.0);
const float OCCLUDER_RADIUS = 8.0;
const float THICKNESS = 0.25;

float intersectRayCircle(vec2 rayOrigin, vec2 rayDirection, vec2 circleCenter, float circleRadius) {
    // Normalize the ray direction
    vec2 normalizedRayDirection = normalize(rayDirection);

    // Calculate the vector from the ray origin to the circle center
    vec2 oc = circleCenter - rayOrigin;

    if (dot(oc, oc) <= circleRadius * circleRadius) {
        return 0.0;
    }

    // Project the vector from the ray origin to the circle center onto the ray direction
    float projLength = dot(oc, normalizedRayDirection);

    // Calculate the perpendicular distance from the projected point to the circle's center
    vec2 projectedPoint = rayOrigin + normalizedRayDirection * projLength;
    vec2 pc = circleCenter - projectedPoint;

    // Calculate the squared perpendicular distance
    float distSq = dot(pc, pc);

    // Check if the ray intersects the circle
    if (distSq <= circleRadius * circleRadius) {
        // Calculate the exact intersection point along the ray
        float t = projLength - sqrt(circleRadius * circleRadius - distSq);
        return t; // Return the entry distance along the ray
    }

    // The ray does not intersect the circle
    return -1.0; // Return -1 indicating miss
}

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
    vec3 color = vec3(0.0);
    int lights_hit = 0;
    for(int i = 0; i < dir_count; i++) {
        /* Ray direction */
        float angle = TAU * ((float(i) + 0.5) / float(dir_count));
        vec2 rd = vec2(cos(angle), sin(angle));

        /* Detect hit */
        float light_dist = 1000000.0;
        vec3 light_color = vec3(1.0, 0.95, 0.9);
        for(int y = 0; y < 3; y++) {
            for(int x = 0; x < 3; x++) {
                if (x == 1 && y == 1) continue;

                float dist = intersectRayCircle(ro, rd, vec2(10.0 + 22.0 * float(x), 10.0 + 22.0 * float(y)), LIGHT_RADIUS);

                if (dist >= 0.0 && light_dist > dist) {
                    light_dist = dist;
                    if (x == 0) light_color.x = 1.0;
                    if (x == 2) light_color.x = 0.0;
                    if (y == 0) light_color.y = 0.0;
                    if (y == 2) light_color.y = 1.0;
                }
            }
        }
        if (light_dist == 1000000.0) light_dist = -1.0;

        float occluder_dist = intersectRayCircle(ro, rd, OCCLUDER_POS, OCCLUDER_RADIUS);

        /* Inside occluder */ 
        if (occluder_dist == 0.0) {
            radiance = -1.0;
            break;
        }
        /* Inside light */ 
        if (light_dist == 0.0) {
            radiance = float(dir_count) * 2.0;
            color += light_color * float(dir_count) * 1.0;
            break;
        }

        /* Light hit */
        if (light_dist > 0.0 && (light_dist < occluder_dist || occluder_dist < 0.0)) {
            radiance += 2.0;
            color += light_color;
            lights_hit++;
        }
    }

    /* Draw the occluder */
    if (radiance < 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    radiance /= float(dir_count);
    color /= float(lights_hit);

    /* Edge fade */
    float sd = min(-screen_dist(ro, vec2(size / 2.0), size / 2.0, 8.0) * 0.5, 1.0);
    
    gl_FragColor = vec4(color, radiance * sd);
}
