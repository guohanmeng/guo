import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShaderMaterial } from 'three';
// import { GUI } from "dat.gui";
import * as dat from "dat.gui";
import { Raycaster, Shading, Vector2 } from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

//mouse interaction
let pointer: THREE.Vector2;
let raycaster: THREE.Raycaster;
let isShiftDown: Boolean = false;

//intersect
let rollOverMesh: THREE.Mesh;
let plane: THREE.Mesh;
let rollOverMaterial: THREE.MeshBasicMaterial;

//hair
let cubeGeo: THREE.BoxGeometry;
let cubeMaterial: THREE.MeshBasicMaterial;
let voxel: any;
let colorList: any = [0x733C3C, 0xE45826, 0xF0A500, 0x357C3C, 0x3A3845, 0x6867AC];
let currentIndex: number = 0;
let currentColor: any = colorList[currentIndex];
let ifShiftColor: Boolean = false;

//face
let face: THREE.Mesh;
let faceMaterial: THREE.MeshBasicMaterial;

let gltf: any;
let model: any;
const objects: any = [];

//light
let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

//gui & controls
let controls: any;
let stats: any;


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
	var params = {
		color: 0x733C3C
	};
	
	var gui = new dat.GUI();
	
	var folder = gui.addFolder( 'MATERIAL' );
	
	folder.addColor( params, 'color' )
		  .onChange( function() { voxel.material.color.set( params.color ); } );
	
	folder.open();
}


function initScene() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x59bfff);

	// camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 500, 800, 1300 );
	camera.lookAt( 0, 0, 0 );

	// renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	// control
	controls = new OrbitControls(camera, renderer.domElement );
	// controls = new FirstPersonControls( camera, renderer.domElement );

	// controls.rollSpeed = Math.PI / 6;
	// controls.autoForward = false;
	// controls.dragToLook = false;

	const shadowIntensity = 0.25;
	pointer = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	// roll-over helpers
	const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
	rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
	rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
	scene.add( rollOverMesh );


	// cubes
	cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
	cubeMaterial = new THREE.MeshLambertMaterial( { color: currentColor });

	
	const loadManager = new THREE.LoadingManager();

	faceMaterial = new THREE.MeshLambertMaterial( { color: 0xFAE5D3  });

	face = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600), faceMaterial);
	scene.add(face);
	objects.push(face);

	var loader = new THREE.TextureLoader();

	loader.load("./resources/textures/face.jpg",
				(texture) => {
					const geometry = new THREE.PlaneGeometry( 600, 600 );

					// geometry.rotateX( - Math.PI / 2 );
				
					plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ) );
					plane.position.z = 300;
					scene.add( plane );
				} );


	// light
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

	const mapSize = 1024; // Default 512
	const cameraNear = 0.5; // Default 0.5
	const cameraFar = 500; // Default 500
	lightPoint.shadow.mapSize.width = mapSize;
	lightPoint.shadow.mapSize.height = mapSize;
	lightPoint.shadow.camera.near = cameraNear;
	lightPoint.shadow.camera.far = cameraFar;

	// Init animation
	animate();
}




function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	// pointermove event listener
	document.addEventListener( 'pointermove', ( event ) => {

		pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	
		raycaster.setFromCamera( pointer, camera );
	
		const intersects = raycaster.intersectObjects( objects, false );
	
		if ( intersects.length > 0 ) {
	
			const intersect = intersects[ 0 ];
	
			rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
			rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
	
			render();
	
		}
	
	} );

	// pointerdown event listener
	document.addEventListener( 'pointerdown', ( event ) => {

		pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	
		raycaster.setFromCamera( pointer, camera );
	
		const intersects = raycaster.intersectObjects( objects, false );
	
		if ( intersects.length > 0 ) {
	
			const intersect = intersects[ 0 ];
	
			// delete cube
			if ( isShiftDown ) {
	
				if ( intersect.object !== face ) {
	
					scene.remove( intersect.object );
	
					objects.splice( objects.indexOf( intersect.object ), 1 );
	
				}
	
				// create cube
			} else {
	
				voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
				voxel.position.copy( intersect.point ).add( intersect.face.normal );
				voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
				scene.add( voxel );
	
				objects.push( voxel );
	
			}
	
			render();
	
		}
	
	} );

	// keydown event listener
	document.addEventListener( 'keydown', ( event ) => {

		switch ( event.keyCode ) {
	
			case 16: 
			isShiftDown = true; 
			break;

			case 32: 
			ifShiftColor = true;
			break
	
		}
	
	} );

	// keyup event listener
	document.addEventListener( 'keyup', ( event ) => {

		switch ( event.keyCode ) {
	
			case 16: isShiftDown = false; break;
	
		}
	
	} );



	function setupKeyControls() {
		// var face = scene.getObjectByName('face');
		document.onkeydown = function(e) {
		  switch (e.keyCode) {
			case 37:
			face.rotation.x += 0.1;
			break;
			case 38:
			face.rotation.z -= 0.1;
			break;
			case 39:
			face.rotation.x -= 0.1;
			break;
			case 40:
			face.rotation.z += 0.1;
			break;
		  }
		};
	  }

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
	requestAnimationFrame(() => {
		// setupKeyControls();
		animate();
	});

	if (stats) stats.update();

	if (controls) controls.update();

	render();
}

function render() {

	renderer.render( scene, camera );

}

main();

