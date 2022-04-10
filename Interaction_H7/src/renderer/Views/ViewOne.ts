import {
	Mesh,
	Renderer,
	BoxGeometry,
	MeshPhongMaterial,
	AmbientLight,
	PointLight,
	Group,
	Material,
	TextureLoader,
	RepeatWrapping,
	Texture,
	MeshBasicMaterial,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
	Clock,
	ShaderMaterial,
	Vector2
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";

import modelPath from '../assets/models/whale.gltf'

export class ViewOne extends BaseView{

	group: Group;
	cube: Mesh;
	plane: Mesh;
	exampleModel: Group;
	exampleTexture: Texture;

	lightAmbient: AmbientLight;
	lightPoint: PointLight;

	shaderMat: ShaderMaterial;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.exampleModel = new Group();
		this.exampleTexture = new Texture();
		this.group = new Group();
		this.scene.add(this.group);
		
		const uniforms = {
			u_time: { type: 'f', value: 1.0 },
			u_resolution: { type: 'v2', value: new Vector2(800, 800) },
			// u_mouse: { type: 'v2', value: new THREE.Vector2() },
		};
	
		this.shaderMat = new ShaderMaterial({
			uniforms: uniforms,
			vertexShader: model.vertexShader,
			fragmentShader: model.fragmentShader,
			side: DoubleSide,
		});



		this.lightAmbient = new AmbientLight(0x333333);
		this.scene.add(this.lightAmbient);

		this.lightPoint = new PointLight(0xffffff);
		this.lightPoint.position.set(-0.5, 0.5, 4);
		this.lightPoint.castShadow = true;
		this.lightPoint.intensity = 0.25;
		this.scene.add(this.lightPoint);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;

		let textureMaterial: Material;
		
		let textureLoader = new TextureLoader()
		const modelLoader = new GLTFLoader()
		modelLoader.load(modelPath, (gltf) => {
			this.exampleModel = gltf.scene;
			// console.log(this.exampleModel);

			this.exampleModel.scale.set(0.01, 0.01, 0.01);
			this.exampleModel.position.x = 1;


			this.group.add(this.exampleModel);
		});
	}

	update(clock: Clock, delta: number): void {

		this.shaderMat.uniforms.u_time.value += delta;

		// group.rotateZ(delta);
		this.group.rotation.set(0, 0, this.model.groupAngle);
		this.group.position.set(this.model.groupX, this.model.groupY, 0);




		// if (this.exampleModel != undefined) {
		// 	this.exampleModel.rotateX(0.01);
		// 	this.exampleModel.rotateY(0.01);
		// }

		// if (this.exampleTexture) {
		// 	this.exampleTexture.center.set(0.5, 0.5);
		// 	this.exampleTexture.rotation += clock.getDelta();
		// }
		
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}