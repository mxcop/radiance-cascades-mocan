import * as THREE from 'three';
import fragment from '../shaders/cascade.fragment.glsl?raw';
import vertex from '../shaders/cascade.vertex.glsl?raw';
import { createComputed, createSignal, useScene } from '@motion-canvas/core';

const layerMaterial = new THREE.ShaderMaterial({
    uniforms: {
        probeSize: {value: new THREE.Vector2(8, 8)},
        size: {value: new THREE.Vector2(64, 64)},
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthTest: false,
});

const threeScene = new THREE.Scene();

const plane = new THREE.PlaneGeometry();
let layer: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
const material = layerMaterial.clone();
const mesh = new THREE.Mesh(plane, material);
mesh.material.uniforms.size.value = new THREE.Vector2(64, 64);
mesh.material.uniforms.probeSize.value = new THREE.Vector2(8, 8);
mesh.renderOrder = 0;
layer = mesh;
threeScene.add(layer);

const camera = new THREE.OrthographicCamera(0, 1, 0, 1, 0, 1);
const orbit = new THREE.Group();
orbit.add(camera);
threeScene.add(orbit);

const probeSize = createSignal<number>(2);

const update = createComputed(() => {
    const ps: number = probeSize();
    mesh.material.uniforms.probeSize.value = new THREE.Vector2(ps, ps);
});

async function setup() {
    useScene().lifecycleEvents.onBeginRender.subscribe(update);
    orbit.position.set(0, 0, 0);
    orbit.rotation.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0);
}

export { threeScene, camera, layer, setup, orbit, probeSize };