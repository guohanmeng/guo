# Final Project -- Arrival

## Video demo
<https://drive.google.com/file/d/1Vt89xKJqknqTIQluG_F9B0RNuSBXaVgr/view?usp=sharing>

## Live Demo
<https://carrotliu.github.io/IDM-CCL-WebGL/Final_Project/dist/>

## Concept
For the final project, I want to simulate the communication between human and alien on the web. The idea comes from “Arrival”. There’re two main interactions: 1) 3D model alien’s hand position would move with the user’s hand when the hand is detected in front of the camera:
![arrival1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival1.png)

2) when user put the hand down, the position of the alien’s hand will be fixed. User then type texts and hit enter, a circular pattern would appear gradually from where the alien’s hand is (want to achieve a 3D ink effect, but currently only able to do a plane moving in a foggy environment):

![arrival2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival2.jpg)
![arrival3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival3.gif)

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
![blender1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender1.png)
![blender2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender2.png)
![blender3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender3.png)
![blender4](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender4.png)

There's a typescript error saying ”Argument of type 'string' is not assignable to parameter of type 'string[]'.” I changed the path string several times, but none of the trial affected the rendering result. Also, when I deliberately assign a wrong path to the texture file, there wasn’t any error message in the console window. (it does have error messages saying fail to load resources on the github page but never have errors on my local server. both don’t render out the texture)


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
