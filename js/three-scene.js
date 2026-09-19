/**
 * TECHXZURA 2026 - Continuous 3D WebGL Scene Engine (Three.js)
 * Implements holographic sphere, neural particle field, 3D cyber grid,
 * continuous scroll-linked camera interpolation, and climax vortex convergence.
 * Fully responsive for mobile (320px+), tablet, and desktop (4K).
 */

class Symposium3DScene {
  constructor() {
    this.container = document.getElementById('webgl-canvas-container');
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.container || !this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // 3D Elements references
    this.heroGroup = null;
    this.heroWireframe = null;
    this.heroInnerCore = null;
    this.heroRing1 = null;
    this.heroRing2 = null;
    this.particleSystem = null;
    this.floatingObjects = [];
    this.cyberGrid = null;
    this.portalGroup = null;
    this.portalRingMesh = null;
    this.portalRingMesh2 = null;
    this.climaxGroup = null;
    this.climaxRings = [];

    // Scroll & Mouse Interactivity state
    this.scrollY = 0;
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Performance & Device Detection
    this.isMobile = window.innerWidth < 768;
    this.particleCount = this.isMobile ? (window.innerWidth < 480 ? 500 : 750) : 1600;

    this.init();
  }

  getResponsiveFov() {
    if (window.innerWidth < 480) return 72;
    if (window.innerWidth < 768) return 66;
    if (window.innerWidth < 1024) return 62;
    return 60;
  }

  init() {
    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05070f, 0.015);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(this.getResponsiveFov(), aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 30);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting
    this.setupLighting();

    // 5. Build 3D Geometries
    this.createHeroHologram();
    this.createNeuralParticleField();
    this.createFloatingGeometries();
    this.createCyberGrid();
    this.createTransitionPortal();
    this.createClimaxVortex();

    // 6. Bind Event Listeners
    window.addEventListener('resize', () => this.onResize());
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initial scroll sync
    this.onScroll();

    // 7. Start Render Loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x0a1026, 1.5);
    this.scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 2.5, 60);
    cyanPoint.position.set(15, 10, 15);
    this.scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0x8b5cf6, 2.5, 60);
    purplePoint.position.set(-15, -10, 15);
    this.scene.add(purplePoint);

    const magentaPoint = new THREE.PointLight(0xff007a, 1.8, 50);
    magentaPoint.position.set(0, -25, 20);
    this.scene.add(magentaPoint);
  }

  createHeroHologram() {
    this.heroGroup = new THREE.Group();
    this.heroGroup.position.set(0, 0, 0);

    // Outer Wireframe Sphere
    const sphereRadius = this.isMobile ? 5.8 : 7;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.heroWireframe = new THREE.Mesh(sphereGeo, wireMat);
    this.heroGroup.add(this.heroWireframe);

    // Inner Glowing Core
    const coreRadius = this.isMobile ? 3.2 : 4;
    const coreGeo = new THREE.OctahedronGeometry(coreRadius, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    this.heroInnerCore = new THREE.Mesh(coreGeo, coreMat);
    this.heroGroup.add(this.heroInnerCore);

    // Orbital Holographic Rings
    const ringRadius1 = this.isMobile ? 7.2 : 8.5;
    const ringGeo = new THREE.TorusGeometry(ringRadius1, 0.06, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6
    });
    this.heroRing1 = new THREE.Mesh(ringGeo, ringMat);
    this.heroRing1.rotation.x = Math.PI / 3;
    this.heroGroup.add(this.heroRing1);

    const ringRadius2 = this.isMobile ? 8.2 : 9.8;
    const ringGeo2 = new THREE.TorusGeometry(ringRadius2, 0.04, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff007a,
      transparent: true,
      opacity: 0.45
    });
    this.heroRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.heroRing2.rotation.y = Math.PI / 4;
    this.heroGroup.add(this.heroRing2);

    this.scene.add(this.heroGroup);
  }

  createNeuralParticleField() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorPurple = new THREE.Color(0x8b5cf6);
    const colorPink = new THREE.Color(0xff007a);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 160;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      const mix = Math.random();
      let c = colorCyan;
      if (mix > 0.65) c = colorPurple;
      else if (mix > 0.4) c = colorPink;

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: this.isMobile ? 0.35 : 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geo, mat);
    this.scene.add(this.particleSystem);
  }

  createFloatingGeometries() {
    const count = this.isMobile ? 6 : 14;
    const geos = [
      new THREE.TetrahedronGeometry(1.8),
      new THREE.OctahedronGeometry(1.5),
      new THREE.IcosahedronGeometry(1.6),
      new THREE.TorusGeometry(1.4, 0.3, 8, 24)
    ];

    const mats = [
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: 0xff007a, wireframe: true, transparent: true, opacity: 0.35 })
    ];

    for (let i = 0; i < count; i++) {
      const geo = geos[i % geos.length];
      const mat = mats[i % mats.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 50,
        -i * 10 + 10,
        (Math.random() - 0.5) * 30 - 5
      );

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        initialY: mesh.position.y,
        floatSpeed: 0.8 + Math.random() * 0.8
      };

      this.floatingObjects.push(mesh);
      this.scene.add(mesh);
    }
  }

  createCyberGrid() {
    const gridHelper = new THREE.GridHelper(120, 40, 0x00f0ff, 0x10162a);
    gridHelper.position.set(0, -18, 0);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.25;
    this.cyberGrid = gridHelper;
    this.scene.add(gridHelper);
  }

  createTransitionPortal() {
    this.portalGroup = new THREE.Group();
    this.portalGroup.position.set(0, -50, -5);

    const torusGeo = new THREE.TorusGeometry(8, 0.2, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5
    });

    this.portalRingMesh = new THREE.Mesh(torusGeo, torusMat);
    this.portalGroup.add(this.portalRingMesh);

    const torusGeo2 = new THREE.TorusGeometry(6.5, 0.15, 16, 50);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6
    });

    this.portalRingMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    this.portalGroup.add(this.portalRingMesh2);

    this.scene.add(this.portalGroup);
  }

  createClimaxVortex() {
    this.climaxGroup = new THREE.Group();
    this.climaxGroup.position.set(0, -115, 5);

    // Climax Hyper Ring 1
    const ringGeo1 = new THREE.TorusGeometry(12, 0.12, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.climaxGroup.add(ring1);
    this.climaxRings.push(ring1);

    // Climax Hyper Ring 2
    const ringGeo2 = new THREE.TorusGeometry(9, 0.1, 16, 60);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff007a,
      transparent: true,
      opacity: 0.6
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    this.climaxGroup.add(ring2);
    this.climaxRings.push(ring2);

    // Climax Hyper Ring 3
    const ringGeo3 = new THREE.TorusGeometry(6, 0.08, 16, 50);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    this.climaxGroup.add(ring3);
    this.climaxRings.push(ring3);

    this.scene.add(this.climaxGroup);
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.isMobile = window.innerWidth < 768;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov = this.getResponsiveFov();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollY = window.scrollY;
    this.targetScrollProgress = totalHeight > 0 ? this.scrollY / totalHeight : 0;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Lerp for Scroll & Mouse
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.06;
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Continuous Scroll-linked Camera Path
    const targetCamY = -this.scrollProgress * 115;
    const targetCamZ = 30 - Math.sin(this.scrollProgress * Math.PI) * 8;
    
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.08;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.08;
    this.camera.position.x = this.mouseX * 2.5;
    this.camera.rotation.y = -this.mouseX * 0.06;
    this.camera.rotation.x = -this.mouseY * 0.04;

    // 1. Hero Hologram Rotations
    if (this.heroGroup) {
      this.heroWireframe.rotation.y += 0.005 + this.scrollProgress * 0.02;
      this.heroWireframe.rotation.x += 0.003;
      this.heroInnerCore.rotation.y -= 0.01;
      this.heroInnerCore.rotation.z += 0.008;

      this.heroRing1.rotation.z += 0.008;
      this.heroRing2.rotation.x += 0.006;

      this.heroGroup.position.z = -this.scrollProgress * 30;
      this.heroGroup.position.y = -this.scrollProgress * 15;
    }

    // 2. Continuous Particle Dynamics
    if (this.particleSystem) {
      this.particleSystem.rotation.y = elapsedTime * 0.03 + this.scrollProgress * 0.4;
      this.particleSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05;

      if (this.scrollProgress > 0.8) {
        const factor = (this.scrollProgress - 0.8) / 0.2;
        this.particleSystem.scale.set(
          1 - factor * 0.4,
          1 - factor * 0.2,
          1 - factor * 0.4
        );
      } else {
        this.particleSystem.scale.set(1, 1, 1);
      }
    }

    // 3. Floating 3D Geometries
    this.floatingObjects.forEach((obj, idx) => {
      obj.rotation.x += obj.userData.rotSpeedX;
      obj.rotation.y += obj.userData.rotSpeedY;
      obj.position.y = obj.userData.initialY + Math.sin(elapsedTime * obj.userData.floatSpeed + idx) * 1.5;
    });

    // 4. Cyber Grid Undulation
    if (this.cyberGrid) {
      this.cyberGrid.position.z = (elapsedTime * 4) % 3;
    }

    // 5. Portal Ring
    if (this.portalGroup) {
      this.portalRingMesh.rotation.z = elapsedTime * 0.4;
      this.portalRingMesh2.rotation.z = -elapsedTime * 0.6;
      const portalScale = 1 + Math.sin(elapsedTime * 2) * 0.08;
      this.portalGroup.scale.set(portalScale, portalScale, portalScale);
    }

    // 6. Climax Clustered Rings
    if (this.climaxRings.length >= 3) {
      this.climaxRings[0].rotation.z = elapsedTime * 0.3;
      this.climaxRings[1].rotation.y = elapsedTime * 0.5;
      this.climaxRings[2].rotation.x = -elapsedTime * 0.4;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.symposiumScene = new Symposium3DScene();
  }
});
