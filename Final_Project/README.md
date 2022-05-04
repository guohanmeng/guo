# Final Project -- Arrival

## Video demo
<https://drive.google.com/file/d/1-_6pdV1FbVD1AYpNofSyp4zKZ2nKXmLb/view?usp=sharing>

## Live Demo
<https://carrotliu.github.io/IDM-CCL-WebGL/Final_Project/dist/>


## Concept
In this project, I want to simulate the communication between human and alien on the web. The idea comes from “Arrival”, a movie about the arrival of aliens on earth and the scientists who tries to communicate with them. The aliens use circular patterns as their language, and perceive events in a non-linear way. The linguistist tries to communicate with them with body language and human language.
![arrival1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival1.png) 

There’re two main interactions: 1) 3D model alien’s hand position would move with the user’s hand when the hand is detected in front of the camera:

![arrival2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival2.jpg)

2) when user put the hand down, the position of the alien’s hand will be fixed. User then type texts and hit enter, a circular pattern would appear gradually from where the alien’s hand is (want to achieve a 3D ink effect, but currently only able to do a plane moving in a foggy environment):

![arrival3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival3.gif)

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


Mashing up ml5, p5 and three.js in typescript:
This part is the hardest for me... Initially, I tried to import the p5 and ml5 using npm. But typescript keep complaining that the module is not declared. I tried several
```javascript

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
I tried to load the camera capture and p5 canvas:
```javascript
console.log("Start Up PoseNet")
let canvas: any = p5.createCanvas(window.innerWidth, window.innerHeight);
canvas.hide();
video = p5.createCapture(videoOptions);
video.hide();
```
But it returns an error saying that createCanvas is not a function:


In the future, I will try to find out how to implement the fly control properly.

## Credit
[Three.js skeleton interaction](https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/)
[ml5js handpose](https://editor.p5js.org/jeeyoonhyun/sketches/YiDt-sf59)