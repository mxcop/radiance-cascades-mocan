import * as THREE from 'three';
import fragment from '../shaders/lights.fragment.glsl?raw';
import vertex from '../shaders/naive.vertex.glsl?raw';
import { createComputed, createSignal, useScene } from '@motion-canvas/core';

const layerMaterial = new THREE.ShaderMaterial({
    uniforms: {
        dir_count: {value: 256},
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
mesh.material.uniforms.dir_count.value = 256;
mesh.material.uniforms.size.value = new THREE.Vector2(64, 64);
mesh.renderOrder = 0;
layer = mesh;
threeScene.add(layer);

const camera = new THREE.OrthographicCamera(0, 1, 0, 1, 0, 1);
const orbit = new THREE.Group();
orbit.add(camera);
threeScene.add(orbit);

const dirCount = createSignal<number>(256);

const update = createComputed(() => {
    const dc: number = dirCount();
    mesh.material.uniforms.dir_count.value = dc;
});

async function setup() {
    useScene().lifecycleEvents.onBeginRender.subscribe(update);
    orbit.position.set(0, 0, 0);
    orbit.rotation.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0);
}

export { threeScene, camera, layer, setup, orbit, dirCount };