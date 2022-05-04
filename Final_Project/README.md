# Final Project -- Arrival

## Video demo
<https://drive.google.com/file/d/1Vt89xKJqknqTIQluG_F9B0RNuSBXaVgr/view?usp=sharing>

## Live Demo
<https://carrotliu.github.io/IDM-CCL-WebGL/Final_Project/dist/>


## Concept
For the final project, I want to simulate the communication between human and alien on the web. The idea comes from “Arrival”.
![arrival1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival1.png) 

There’re two main interactions: 1) 3D model alien’s hand position would move with the user’s hand when the hand is detected in front of the camera:

![arrival2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival2.jpg)

2) when user put the hand down, the position of the alien’s hand will be fixed. User then type texts and hit enter, a circular pattern would appear gradually from where the alien’s hand is (want to achieve a 3D ink effect, but currently only able to do a plane moving in a foggy environment):

![arrival3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival3.gif)

## Credit
This assignment is inspired by [webgl_interactive_voxelpainter](https://threejs.org/examples/?q=interac#webgl_interactive_voxelpainter), a three js example code. I want to make a bald head that user can pain hairs/mustache onto. 

## Process

Add fog: 
```javascript
const color = 0xffffff;  // white
const near = 3;
const far = 5;
this.scene.fog = new Fog(color, near, far);
this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 5);
this.camera.position.z = 4;
this.scene.background = new Color(0xffffff); 
```
Blender modeling and rigging:
![blender1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender1.png)
![blender2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender2.png)
![blender3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender3.png)
![blender4](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender4.png)

I tried to import the p5 and ml5 using npm but failed:

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
