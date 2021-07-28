import { useEffect } from 'react';
import * as THREE from 'three';

import SunTexture from '../src/assets/images/sun.jpeg';
import MercuryTexture from '../src/assets/images/mercury.jpeg';
import VenusTexture from '../src/assets/images/venus.jpeg';
import EarthTexture from '../src/assets/images/earth.jpeg';
import MarsTexture from '../src/assets/images/mars.jpeg';
import JupiterTexture from '../src/assets/images/jupiter.jpeg';
import SaturnTexture from '../src/assets/images/saturn.jpeg';
import UranusTexture from '../src/assets/images/uranus.jpeg';
import NeptuneTexture from '../src/assets/images/neptune.jpeg';
import PlutoTexture from '../src/assets/images/pluto.jpeg';
import StarsTexture from '../src/assets/images/stars.jpeg';

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
    camera.position.set(150, 0, 50);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, -10);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Scene
    const scene = new THREE.Scene();
    scene.background = textureLoader.load(StarsTexture);

    // Mesh Creator
    function createSphericalMesh({radius, texture}) {
      const sphereGeometry = new THREE.SphereGeometry(radius, 24, 24);
      const sphereMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load(texture)});
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphereMesh.position.set(0, 0, 0);
      sphereMesh.rotation.x = Math.PI / 2;
      scene.add(sphereMesh);
      return sphereMesh;
    }

    // Sun
    const sunMesh = createSphericalMesh({ radius: 10, texture: SunTexture});

    // Mercury
    const mercuryMesh = createSphericalMesh({radius: 1, texture: MercuryTexture});
    const mercuryPath = new THREE.EllipseCurve(0, -10, 20, 30, 0, Math.PI * 2);

    // Venus
    const venusMesh = createSphericalMesh({radius: 1.5, texture: VenusTexture});
    const venusPath = new THREE.EllipseCurve(0, -15, 30, 45, Math.PI / 2, 5 * Math.PI / 2, true);

    // Earth
    const earthMesh = createSphericalMesh({radius: 1.5, texture: EarthTexture});
    const earthPath = new THREE.EllipseCurve(0, -20, 40, 60, Math.PI, Math.PI * 3);

    // Mars
    const marsMesh = createSphericalMesh({radius: 1, texture: MarsTexture});
    const marsPath = new THREE.EllipseCurve(0, -15, 50, 75, 3 * Math.PI / 2, 7 * Math.PI / 2);

    // Jupiter
    const jupiterMesh = createSphericalMesh({radius: 2.5, texture: JupiterTexture});
    const jupiterPath = new THREE.EllipseCurve(0, -15, 60, 90, 0, Math.PI * 2);

    // Saturn
    const saturnMesh = createSphericalMesh({radius: 2.5, texture: SaturnTexture});
    const saturnPath = new THREE.EllipseCurve(0, -15, 70, 105, Math.PI / 2, 5 * Math.PI / 2);

    // Uranus
    const uranusMesh = createSphericalMesh({radius: 2, texture: UranusTexture});
    const uranusPath = new THREE.EllipseCurve(0, -15, 80, 120, Math.PI, Math.PI * 3);

    // Neptune
    const neptuneMesh = createSphericalMesh({radius: 2, texture: NeptuneTexture});
    const neptunePath = new THREE.EllipseCurve(0, -15, 90, 135, 3 * Math.PI / 2, 7 * Math.PI / 2);

    // Pluto
    const plutoMesh = createSphericalMesh({radius: 1, texture: PlutoTexture});
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

      mesh.rotation.y = time;
    }

    function render(time) {
      time = time * 0.001;

      if(resizeRendereToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      //Sun Position Update
      sunMesh.rotation.y = time;

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

      requestAnimationFrame(render);
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
