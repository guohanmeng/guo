# Interaction: Customizing your head

<!-- A basic [THREE.js](https://threejs.org/) project in [TypeScript](https://www.typescriptlang.org/) with [Vite](https://vitejs.dev/). Includes OrbitControls, Stats and basic shadows. -->

<!-- View demo hosted on CloudFlare pages: [vite-threejs-ts-starter.pages.dev](https://vite-threejs-ts-starter.pages.dev/) -->

## Video demo
<https://drive.google.com/file/d/1XptXKOJx9-NXmj5gzKNGr9m9Q9Te15yy/view?usp=sharing>

## Inspiration
This assignment is inspired by [webgl_interactive_voxelpainter](https://threejs.org/examples/?q=interac#webgl_interactive_voxelpainter), a three js example code. I want to make a bald head that user can pain hairs/mustache onto. 

## Process
I painted the texture in procreate and used the following code to load two textures and apply them to a cube:
```bash
const loadManager = new THREE.LoadingManager();
const loader = new THREE.CubeTextureLoader(loadManager);

const textureface: any = [
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/head.jpg') }), //right side
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/head.jpg')}), //left side
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/head.jpg')}), //top side
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/head.jpg')}), //bottom side
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/face.jpg')}), //front side
      new THREE.MeshBasicMaterial({ map: loader.load('./resources/textures/head.jpg')}), //back side
  ];

loadManager.onLoad = () => {
	face = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600), textureface);
	scene.add(face);
	objects.push(face);

}
```
However, the cube is always black and there's no error message in the console:

## Demo Pic


<!-- <img src=".resources/textures/sealife1.jpg"> -->


<!-- ## Alternate Demos

Toggle commented out code in `main.ts` to run the `Shader.ts` demo. Based on the `THREE.js` example from  [Book Of Shaders](https://thebookofshaders.com/04/).

<img src="https://github.com/defmech/vite-threejs-ts-starter/blob/main/resources/shader_1.png?raw=true" width="512" height="512"> -->
