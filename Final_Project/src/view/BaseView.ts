import { Clock, PerspectiveCamera, Renderer, Color, Scene, Fog, WebGLRenderer } from "three"

export class BaseView {

	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;

	model: any;

	constructor(model: any, renderer: WebGLRenderer) {
		this.scene = new Scene();
		const color = 0xffffff;  // white
		const near = 3;
		const far = 5;
		this.scene.fog = new Fog(color, near, far);
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 5);
		this.camera.position.z = 4;
		this.scene.background = new Color(0xffffff); 
		this.renderer = renderer;
		this.model = model;
	}

	//@ts-ignore
	update(clock: Clock): void {}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}