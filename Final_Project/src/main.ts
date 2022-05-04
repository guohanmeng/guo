import './style.scss';
import * as THREE from 'three';
// import * as ML5 from 'ml5';
// import * as p5 from 'p5';
import { Raycaster, ShaderMaterial, Shading, Vector2, Scene, PerspectiveCamera } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// import vertexShader from '../resources/shaders/shader.vert?raw';
// import fragmentShader from '../resources/shaders/shader.frag?raw';
import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';


declare let p5: any;
declare let ml5: any;

let handpose: any;
let resullts: any;
let predictions: Array<any> = [];
let handPosition: any;
let model = {
	activeView: 0,
	pointerPosition: new THREE.Vector2(0,0)
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

let stats: any;

let raycaster: THREE.Raycaster;
// let pointerPosition: THREE.Vector2;
let poseNet: any;
let poses: Array<any> = [];
let videoTexture: any;
let videoElement: any;
// Grab elements, create settings, etc.
var video: any = document.getElementById("video");
var canvas = document.getElementById("canvas");
var sketch = function (p: any) {

	let x = 100; 
	let y = 100;
  
	p.setup = function() {
	  	let canvas: any = p.createCanvas(window.innerWidth, window.innerHeight);
	  	canvas.hide();
		let videoOptions = {
			audio: false, video: {
				width: canvas.width,
				height: canvas.height,
			}
		}
		video = p.createCapture(videoOptions);
		handpose = ml5.handpose(video, function(){console.log("Model ready!")});
		//@ts-ignore
		handpose.on("predict", results => {
			predictions = results;
		  });
		video.hide();
	  
	};
	p.draw = function(){
		for (let i = 0; i < predictions.length; i += 1) {
			const prediction = predictions[i];
			for (let j = 0; j < prediction.landmarks.length; j += 1) {
				console.log(predictions[0].landmarks[9][0])
				handPosition = {x: predictions[0].landmarks[9][0], y: predictions[0].landmarks[9][1]}
				viewOne.onHandMove(handPosition, viewOne.elbow, 50);
				viewOne.onHandMove(handPosition, viewOne.wrist, 30);
			}
		}
		// We can call both functions to draw all keypoints and the skeletons
		
	}

  };
let myp5 = new p5(sketch);

function setupPoseNet() {
	console.log("Start Up PoseNet")
	// let canvas: any = p5.createCanvas(window.innerWidth, window.innerHeight);
	// canvas.hide();
	// let videoOptions = {
	// 	audio: false, video: {
	// 		width: canvas.width,
	// 		height: canvas.height,
	// 	}
	// }
	// video = p5.createCapture(videoOptions);
	// video.hide();
	// console.log("Start Up PoseNet")

	var params = {
		imageScaleFactor: 0.6,
		outputStride: 8,
		flipHorizontal: false,
		minConfidence: 0.2,
		maxPoseDetections: 1,
		scoreThreshold: 0.5,
		nmsRadius: 20,
		detectionType: 'single',
		multiplier: 1.01,
	}

	// Create a new poseNet method with a single detection
	// video.size(width, height);
	console.log(video, params);
	poseNet = ml5.poseNet(video, params, function () {
		console.log("model ready!!!!!!!!!!!!!!");
		poseNet.multiPose(video);
		ml5.select('#status').html('Model Loaded');
		poseNet.detectionType = 'single';
	});
	
	poseNet.detectionType = 'single';

	// Set up an event that fills the global variable "poses" with an array every time new poses are detected
	poseNet.on('pose', function (results: any) {
		poses = results;
		console.log(poses);

	});


}

let viewOne: ViewOne;

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

	viewOne.plane.position.x = viewOne.cube.position.x;
	viewOne.scene.add(viewOne.plane);
    let canvas: any = document.createElement("canvas");
	viewOne.textMove();
}




function main() {
	initScene();
	initStats();
	// setupPoseNet();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
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



	// // Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('pointermove', onPointerMove);
}

function onWindowResize() {
	viewOne.onWindowResize();

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

		default:
			break;
	}
	





	if (stats) stats.update();



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
