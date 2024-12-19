// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Load textures
const textureLoader = new THREE.TextureLoader();
const metalColorTexture = textureLoader.load('/textures/iron/color.webp'); // Color map
const metalRoughnessTexture = textureLoader.load('/textures/iron/roughness.jpg'); // Roughness map
const metalNormalTexture = textureLoader.load('/textures/iron/normal.jpg'); // Normal map
const metalMetalnessTexture = textureLoader.load('/textures/iron/metalness.jpg'); // Metalness map

// Material with PBR
const material = new THREE.MeshStandardMaterial({
  map: metalColorTexture,
  roughnessMap: metalRoughnessTexture,
  normalMap: metalNormalTexture,
  metalnessMap: metalMetalnessTexture,
  metalness: 1.0,
  roughness: 0.5,
});

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
