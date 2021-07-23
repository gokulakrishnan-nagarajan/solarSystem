import { useEffect } from 'react';
import * as THREE from 'three';

import './App.scss';

function App() {
  useEffect(() => {
    // Renderer
    const canvas = document.querySelector('#render-area');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

    // Camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 150);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // Scene
    const scene = new THREE.Scene();

    function createSphericalMesh(radius, color) {
      const sphereGeometry = new THREE.SphereGeometry(radius, 12, 12);
      const sphereMaterial = new THREE.MeshPhongMaterial({emissive: color});
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphereMesh.position.set(0, 0, 0);
      scene.add(sphereMesh);
      return sphereMesh;
    }

    // Sun
    const sunMesh = createSphericalMesh(10, 0xFFFF00);

    // Mercury
    const mercuryMesh = createSphericalMesh(1, 0x666666);
    const mercuryPath = new THREE.EllipseCurve(0, -10, 20, 30, 0, Math.PI * 2);

    // Venus
    const venusMesh = createSphericalMesh(1.5, 0xCCCCCC);
    const venusPath = new THREE.EllipseCurve(0, -15, 30, 45, Math.PI / 2, 5 * Math.PI / 2, true);

    // Earth
    const earthMesh = createSphericalMesh(1.5, 0x0000FF);
    const earthPath = new THREE.EllipseCurve(0, -20, 40, 60, Math.PI, Math.PI * 3);

    // Mars
    const marsMesh = createSphericalMesh(1, 0xFF6633);
    const marsPath = new THREE.EllipseCurve(0, -15, 50, 75, 3 * Math.PI / 2, 7 * Math.PI / 2);

    // Jupiter
    const jupiterMesh = createSphericalMesh(2.5, 0xFF9999);
    const jupiterPath = new THREE.EllipseCurve(0, -15, 60, 90, 0, Math.PI * 2);

    // Saturn
    const saturnMesh = createSphericalMesh(2.5, 0xFFFFCC);
    const saturnPath = new THREE.EllipseCurve(0, -15, 70, 105, Math.PI / 2, 5 * Math.PI / 2);

    // Uranus
    const uranusMesh = createSphericalMesh(2, 0xCCCCFF);
    const uranusPath = new THREE.EllipseCurve(0, -15, 80, 120, Math.PI, Math.PI * 3);

    // Neptune
    const neptuneMesh = createSphericalMesh(2, 0x0000FF);
    const neptunePath = new THREE.EllipseCurve(0, -15, 90, 135, 3 * Math.PI / 2, 7 * Math.PI / 2);

    // Pluto
    const plutoMesh = createSphericalMesh(1, 0xCCCCCC);
    const plutoPath = new THREE.EllipseCurve(0, -15, 100, 150, 0, Math.PI * 2);

    // Render
    function resizeRendereToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const needResize = width !== canvas.width || height !== canvas.height;

      if(needResize) {
        renderer.setSize(width, height, false);
      }

      return needResize;
    }

    function updatePosition(mesh, path, time, timeFactor) {
      const position = new THREE.Vector2();
      path.getPointAt(time * timeFactor % 1, position);
      mesh.position.set(position.x, position.y, 0);
    }

    function render(time) {
      time = time * 0.001;

      if(resizeRendereToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      // Mercury Position Update
      updatePosition(mercuryMesh, mercuryPath, time, 1/2);

      // Venus Position Update
      updatePosition(venusMesh, venusPath, time, 1/4);

      // Earth Position Update
      updatePosition(earthMesh, earthPath, time, 1/8);

      // Mars Position Update
      updatePosition(marsMesh, marsPath, time, 1/16);

      // Jupiter Position Update
      updatePosition(jupiterMesh, jupiterPath, time, 1/32);

      // Saturn Position Update
      updatePosition(saturnMesh, saturnPath, time, 1/64);

      // Uranus Position Update
      updatePosition(uranusMesh, uranusPath, time, 1/96);

      // Neptune Position Update
      updatePosition(neptuneMesh, neptunePath, time, 1/128);

      // Pluto Position Update
      updatePosition(plutoMesh, plutoPath, time, 1/160);

      renderer.render(scene, camera);

      setTimeout(() => {
        requestAnimationFrame(render);
      }, 16);
    }

    requestAnimationFrame(render);
  }, []);

  return (
    <div className="app-container">
      <canvas id="render-area"></canvas>
    </div>
  );
}

export default App;
