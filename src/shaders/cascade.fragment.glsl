uniform vec2 probeSize;
uniform vec2 size;

in vec2 textureUV;

void main() {
    vec2 pixelCoord = textureUV * size;
    vec2 probeCoord = pixelCoord / probeSize;
    vec2 probeIndex = floor(probeCoord);
    vec2 dirIndex = fract(probeCoord);
    gl_FragColor = vec4(dirIndex.x, dirIndex.y, 0.0, 1.0);
}
