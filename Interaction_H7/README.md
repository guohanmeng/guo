# Interaction: Customizing a head

<!-- A basic [THREE.js](https://threejs.org/) project in [TypeScript](https://www.typescriptlang.org/) with [Vite](https://vitejs.dev/). Includes OrbitControls, Stats and basic shadows. -->

<!-- View demo hosted on CloudFlare pages: [vite-threejs-ts-starter.pages.dev](https://vite-threejs-ts-starter.pages.dev/) -->

## Video demo
<https://drive.google.com/file/d/1XptXKOJx9-NXmj5gzKNGr9m9Q9Te15yy/view?usp=sharing>

## Live Demo
<https://carrotliu.github.io/IDM-CCL-WebGL/Interaction_H7/dist/>

## Demo Pic
![demopic](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Interaction_H7/demopic.jpg)

## Inspiration
This assignment is inspired by [webgl_interactive_voxelpainter](https://threejs.org/examples/?q=interac#webgl_interactive_voxelpainter), a three js example code. I want to make a bald head that user can pain hairs/mustache onto. 

## Process
I painted the texture in procreate and used the following code to load two textures and apply them to a cube:
```javascript
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
![process](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Interaction_H7/process.png)

There's a typescript error saying ”Argument of type 'string' is not assignable to parameter of type 'string[]'.” I changed the path string several times, but none of the trial affected the rendering result. Also, when I deliberately assign a wrong path to the texture file, there wasn’t any error message in the console window. (it does have error messages saying fail to load resources on the github page but never have errors on my local server. both don’t render out the texture)

After consulting professor Cotter, I learn that the cubemapping is typically used in the background /lighting. So I make a plane to display the face and move it out to align with the front face of the cube. Since other faces are just plain, single color, I just change the cube material's color.
```javascript
var loader = new THREE.TextureLoader();
loader.load("./resources/textures/face.jpg",
			(texture) => {
				const geometry = new THREE.PlaneGeometry( 600, 600 );

				// geometry.rotateX( - Math.PI / 2 );
			
				plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ) );
				plane.position.z = 300;
				scene.add( plane );
			} );
```
In this way, I successfully display the texture.

I also added a gui, which allows users to change the color of the painted voxel:

```javascript
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
```
I wanted to add fly controls to allow users rotate the head without clicking, but failed. I also tried the firstperson control:
```javascript
controls = new FirstPersonControls( camera, renderer.domElement );
controls.rollSpeed = Math.PI / 6;
controls.autoForward = false;
controls.dragToLook = false;
```
Not working, either. 

In the future, I will try to find out how to implement the fly control properly.



<!-- <img src=".resources/textures/sealife1.jpg"> -->


<!-- ## Alternate Demos

Toggle commented out code in `main.ts` to run the `Shader.ts` demo. Based on the `THREE.js` example from  [Book Of Shaders](https://thebookofshaders.com/04/).

<img src="https://github.com/defmech/vite-threejs-ts-starter/blob/main/resources/shader_1.png?raw=true" width="512" height="512"> -->
