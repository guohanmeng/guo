import './style.scss';
import * as THREE from 'three';
import { Raycaster, ShaderMaterial, Shading, Vector2, Scene, PerspectiveCamera } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

// import vertexShader from '../resources/shaders/shader.vert?raw';
// import fragmentShader from '../resources/shaders/shader.frag?raw';
import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';
import { ViewTwo } from './view/ViewTwo';

let model = {
	groupX: 0,
	groupY: 0,
	groupAngle: 0,
	activeView: 0,
	pointerPosition: new THREE.Vector2(0,0)
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

let controls: DragControls;
let stats: any;

let raycaster: THREE.Raycaster;
// let pointerPosition: THREE.Vector2;

let viewOne: ViewOne;
let viewTwo: ViewTwo;
let views: BaseView[] = [];

let texts = [];

let textInput: any = document.getElementById("text");  //get a hold of something in the DOM
    textInput.addEventListener("keydown", function (e: any) {
        if (e.key === "Enter") {  
     		createNewText(textInput.value);
        }
    });

function createNewText(text_msg: any) {
    console.log("Created New Text");
    // let canvas: any = document.createElement("canvas");
    // canvas.width = 512;
    // canvas.height = 512;
    // let context: any = canvas.getContext("2d");
    // // context.clearRect(0, 0, canvas.width, canvas.height);
    // var fontSize = 30;
    // context.font = fontSize + "pt Arial";
    // context.textAlign = "center";
    // context.fillStyle = "white";
    // context.fillText(text_msg, canvas.width / 2, canvas.height / 2);
    // var textTexture = new THREE.Texture(canvas);
    // textTexture.needsUpdate = true;
    // var material = new THREE.MeshBasicMaterial({ map: textTexture, transparent:true });
    // var geo = new THREE.PlaneGeometry(1, 1);
    // var mesh = new THREE.Mesh(geo, material);

    // const posInWorld = new THREE.Vector3();
    // //remember we attached a tiny to the  front of the camera in init, now we are asking for its position

    // in_front_of_you.position.set(0,0,-(600-camera3D.fov*7));  //base the the z position on camera field of view
    // in_front_of_you.getWorldPosition(posInWorld);
    // mesh.position.x = 0;
	// mesh.position.y = 0;
	// mesh.position.z = 1.5;

    // mesh.lookAt(0,0,0);
    // mesh.scale.set(10,10, 10);
    // BaseView.scene.add(mesh);
    // texts.push({"object":mesh, "texture":textTexture, "text":text_msg});
}


function main() {
	initScene();
	initStats();
	initGUI();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initGUI() {
	const gui = new DAT.GUI();

	let tlSettings = {
		position: 0,
		play: () => { viewTwo.tl.play() },
		pause: () => { viewTwo.tl.pause() },
		restart: () => {
			viewTwo.tl.pause()
			viewTwo.tl.seek(0)
			viewTwo.tl.play()
		}
	}
	const tlControls = gui.addFolder("timeline")
	tlControls.open()
	tlControls.add(tlSettings, "position", 0, 8, 0.01).onChange((value) => {
		viewTwo.tl.pause()
		viewTwo.tl.seek(value)
	})
	tlControls.add(tlSettings, "play")
	tlControls.add(tlSettings, 'pause');
	tlControls.add(tlSettings, "restart");
}

function initScene() {
	

	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	viewOne = new ViewOne(model, renderer);
	views.push(viewOne);

	// viewTwo = new ViewTwo(model, renderer);
	// views.push(viewTwo);


	// controls = new OrbitControls(camera, renderer.domElement);

	raycaster = new THREE.Raycaster();
	// model.pointerPosition = new THREE.Vector2(0,0);

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
		// u_mouse: { type: 'v2', value: new THREE.Vector2() },
	};

	// add event listener to highlight dragged objects

	// controls = new DragControls([plane], camera, renderer.domElement);

	// controls.addEventListener('dragstart', function(event) {
	// 	event.object.material.emissive.set(0xaaaaaa);
	// })

	// controls.addEventListener('dragend', function (event) {
	// 	event.object.material.emissive.set(0x000000);
	// })

	// // Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('pointermove', onPointerMove);

	window.addEventListener('keydown', (event) => {
		const { key } = event;
		// console.log(key);

		switch (key) {
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
				// renderer.render(scene, camera);

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			case 'ArrowRight':
				model.activeView = (model.activeView + 1) % views.length
				break;

			case 'ArrowLeft':
				model.activeView = (model.activeView - 1)
				if (model.activeView < 0) {
					model.activeView = views.length - 1;
				}
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	viewOne.onWindowResize();
	viewTwo.onWindowResize();
}

function onPointerMove(event: any) {
	model.pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	model.pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let delta = clock.getDelta();

	// shaderMat.uniforms.u_time.value += delta;

	switch (model.activeView) {
		case 0:
			viewOne.update(clock);
			break;

		case 1:
			viewTwo.update(clock);
			break;

		default:
			break;
	}
	


	// raycaster.setFromCamera(pointerPosition, camera)
	// const intersects = raycaster.intersectObjects(scene.children)

	// for (let i = 0; i < scene.children.length; i++) {
	// 	if (scene.children[i].type === "Mesh") {
	// 		(scene.children[i] as MeshObj).material.color.set(0x888888);
	// 	}
	// }

	// for (let i = 0; i < intersects.length; i++) {
	// 	if (intersects[i].object.type === 'Mesh') {
	// 		(intersects[i].object as MeshObj).material.color.set(0xff0000);
	// 	}
	// }


	if (stats) stats.update();

	// if (controls) controls.update();

	renderer.render(views[model.activeView].scene, views[model.activeView].camera);
}

main();


interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}
