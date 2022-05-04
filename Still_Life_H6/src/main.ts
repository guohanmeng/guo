import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;
let model1: any;
let model2: any;
let model3: any;
let controls: any;
let stats: any;
let gltf: any;
let model: any;

let exampleModel: THREE.Group;
let exampleTexture: THREE.Texture;

// import vertexShader from '../resources/shaders/shader.vert?raw';
// import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initScene() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x59bfff);

	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 8;
	camera.position.y = 3;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);


	document.body.appendChild(renderer.domElement);
	controls = new OrbitControls(camera, renderer.domElement );
	const shadowIntensity = 0.25;

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint);



    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
  
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

      // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3000, 3000),
    new THREE.MeshPhongMaterial({ color: 0x072F5F, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);




	const mapSize = 1024; // Default 512
	const cameraNear = 0.5; // Default 0.5
	const cameraFar = 500; // Default 500
	lightPoint.shadow.mapSize.width = mapSize;
	lightPoint.shadow.mapSize.height = mapSize;
	lightPoint.shadow.camera.near = cameraNear;
	lightPoint.shadow.camera.far = cameraFar;

	// load ladybug
	const loader = new GLTFLoader();
	loader.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        model1 = gltf.scene.children[0];
        model2 = gltf.scene.children[0];
        console.log(model);
        // model1.position.set(-6, 1, 6);
        // model2.position.set(-1, 3, 1);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});
    const loader3 = new GLTFLoader();
	loader3.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        // model1 = gltf.scene.children[0];
        // model2 = gltf.scene.children[0];
        console.log(model);
        model.position.set(-6, 1, 3);
        // model2.position.set(-1, 3, 1);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});

    	loader3.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        // model1 = gltf.scene.children[0];
        // model2 = gltf.scene.children[0];
        console.log(model);
        model.position.set(-6, 1, 3);
        // model2.position.set(-1, 3, 1);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});

    const loader4 = new GLTFLoader();
	loader4.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        // model1 = gltf.scene.children[0];
        // model2 = gltf.scene.children[0];
        console.log(model);
        // model.position.set(-6, 1, 3);
        model.position.set(-1, 3, 1);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});

    const loader5 = new GLTFLoader();
	loader5.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        // model1 = gltf.scene.children[0];
        // model2 = gltf.scene.children[0];
        console.log(model);
        // model.position.set(-6, 1, 3);
        model.position.set(-2, 2, -3);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});
    
    const loader6 = new GLTFLoader();
	loader6.load('./resources/models/fish.glb', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        // model1 = gltf.scene.children[0];
        // model2 = gltf.scene.children[0];
        console.log(model);
        // model.position.set(-6, 1, 3);
        model.position.set(-3, 1, 5);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        // scene.add(model1);
        // scene.add(model2);
	});
    const loader2 = new GLTFLoader();
	loader2.load('./resources/models/whale.gltf', (gltfData: any) => {
		gltf = gltfData;
		console.log(gltf);
		gltf.castShadow = true;
        model = gltf.scene.children[0];
        model1 = gltf.scene.children[0];
        model.position.set (20, 3, 1);
        console.log(model);
        model.scale.set(0.01, 0.01, 0.01);
		scene.add(model);
        scene.add(model1);
	});

    // const loader3 = new GLTFLoader();
	// loader3.load('./resources/models/bottomAnimal.gltf', (gltfData: any) => {
	// 	gltf = gltfData;
	// 	console.log(gltf);
	// 	gltf.castShadow = true;
    //     model = gltf.scene.children[0];
    //     console.log(model);
    //     model.scale.set(0.01, 0.01, 0.01);
	// 	scene.add(model);
	// });


	// Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('keydown', (event) => {
		const { key } = event;

		switch (key) {
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
				renderer.render(scene, camera);

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	if (stats) stats.update();

	if (controls) controls.update();

	renderer.render(scene, camera);
}

main();