uniform vec2 probeSize;
uniform vec2 interval;
uniform vec2 size;

in vec2 textureUV;

const float PI = 3.14159265;
const float TAU = 2.0 * PI;

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

void main() {
    vec2 pixelCoord = textureUV * size;
    vec2 probeCoord = pixelCoord / probeSize;
    vec2 probeIndex = floor(probeCoord);
    vec2 dirIndex = fract(probeCoord);

    if (interval.y == 0.0) {
        gl_FragColor = vec4(dirIndex.x, dirIndex.y, 0.0, 1.0);
        return;
    }

    vec2 intDirIndex = dirIndex * probeSize;

    /* Ray direction */
    float angle = TAU * ((float(intDirIndex.y * probeSize.x + intDirIndex.x) + 0.5) / float(probeSize.x * probeSize.y));
    vec2 rd = vec2(cos(angle), sin(angle));
    vec2 ro = probeIndex * probeSize + probeSize / 2.0;

    float dist = intersectRayCircle(ro, rd, vec2(32.0, 32.0), 8.0);

    if (dist >= interval.x && dist <= interval.y) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        return;
    }
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
