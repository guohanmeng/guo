var R=Object.defineProperty;var T=(o,e,n)=>e in o?R(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n;var a=(o,e,n)=>(T(o,typeof e!="symbol"?e+"":e,n),n);import{S as V,F as A,P as F,C as G,g as O,G as v,T as N,M as P,B as I,a as x,A as _,b as j,c as D,d as q,e as K,f as S,h as L,i as U,W as X,j as Y,R as J,V as k,k as Q}from"./vendor.ff0088cc.js";const Z=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}};Z();class ${constructor(e,n){a(this,"scene");a(this,"camera");a(this,"renderer");a(this,"model");this.scene=new V;const s=16777215,t=3,i=5;this.scene.fog=new A(s,t,i),this.camera=new F(75,window.innerWidth/window.innerHeight,.1,5),this.camera.position.z=4,this.scene.background=new G(16777215),this.renderer=n,this.model=e}update(e){}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}class ee extends ${constructor(e,n){super(e,n);a(this,"group");a(this,"cube");a(this,"plane");a(this,"tl");a(this,"alien");a(this,"alienHand");a(this,"initPos");a(this,"initPlane");a(this,"elbow");a(this,"wrist");a(this,"exampleTexture");a(this,"lightAmbient");a(this,"lightPoint");this.tl=O.timeline(),this.alien=new v,this.alienHand=new v,this.exampleTexture=new N,this.group=new v,this.scene.add(this.group),this.plane=new P,this.initPos=0,this.initPlane=-.5;const s=new I,t=new x({color:15776699});this.cube=new P(s,t),this.cube.castShadow=!0,this.lightAmbient=new _(3355443),this.scene.add(this.lightAmbient),this.lightPoint=new j(16777215),this.lightPoint.position.set(-.5,.5,4),this.lightPoint.castShadow=!0,this.lightPoint.intensity=.25,this.scene.add(this.lightPoint);const i=1024,l=.5,w=500;this.lightPoint.shadow.mapSize.width=i,this.lightPoint.shadow.mapSize.height=i,this.lightPoint.shadow.camera.near=l,this.lightPoint.shadow.camera.far=w,new D().setPath("../resources/textures/").load("1.png",u=>{const r=new q(3,3,6,6),E=new K({color:65280,map:u,transparent:!0});this.plane=new P(r,E),this.plane.position.z=this.initPlane,this.plane.receiveShadow=!0,new S().setPath("../resources/models/").load("alien_body.gltf",g=>{this.alien=g.scene,this.alien.scale.set(.9,.9,.9),this.alien.position.x=-2.5,this.alien.position.z=-.8,new x({color:8421504}),this.scene.add(this.alien)}),new S().setPath("../resources/models/").load("alienHand.gltf",g=>{this.alienHand=g.scene,this.alienHand.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0),c.isBone&&c.name==="Bone005"&&(this.elbow=c),c.isBone&&c.name==="Bone001"&&(this.wrist=c)}),console.log(g.scene),this.alienHand.scale.set(.9,.9,.9),this.alienHand.position.x=-2.5,this.alienHand.position.z=-2.5,this.alienHand.position.y=1,new x({color:8421504}),this.scene.add(this.alienHand)})})}getHandDegrees(e,n,s){let t=0,i=0,l,w,f,u,r={x:window.innerWidth,y:window.innerHeight};return e<=r.x/2&&(l=r.x/2-e,w=l/(r.x/2)*100,t=s*w/100*-1),e>=r.x/2&&(l=e-r.x/2,w=l/(r.x/2)*100,t=s*w/100),n<=r.y/2&&(f=r.y/2-n,u=f/(r.y/2)*100,i=s*.5*u/100*-1),n>=r.y/2&&(f=n-r.y/2,u=f/(r.y/2)*100,i=s*u/100),{x:t,y:i}}onHandMove(e,n,s){let t=this.getHandDegrees(e.x,e.y,s);n.rotation.y=L.degToRad(t.x),n.rotation.x=L.degToRad(t.y)}alienMove(){this.tl.to(this.alien.position,{y:this.initPos+=.1,duration:1,ease:"sin.out",yoyo:!0}),this.tl.to(this.alien.position,{y:this.initPos-=.1,duration:1,ease:"sin.in",yoyo:!0},">")}textMove(){this.tl.to(this.plane.position,{z:this.initPlane+=1.5,duration:.5,ease:"sin.in",yoyo:!0})}update(e){this.alien!=null&&this.alienMove()}}let z,p=[],b,m={activeView:0,pointerPosition:new k(0,0)},h,W=new Q,y;var M=document.getElementById("video");document.getElementById("canvas");var te=function(o){o.setup=function(){let e=o.createCanvas(window.innerWidth,window.innerHeight);e.hide();let n={audio:!1,video:{width:e.width,height:e.height}};M=o.createCapture(n),z=ml5.handpose(M,function(){console.log("Model ready!")}),z.on("predict",s=>{p=s}),M.hide()},o.draw=function(){for(let e=0;e<p.length;e+=1){const n=p[e];for(let s=0;s<n.landmarks.length;s+=1)console.log(p[0].landmarks[9][0]),b={x:p[0].landmarks[9][0],y:p[0].landmarks[9][1]},d.onHandMove(b,d.elbow,50),d.onHandMove(b,d.wrist,30)}}};new p5(te);let d,H=[],B=document.getElementById("text");B.addEventListener("keydown",function(o){o.key==="Enter"&&ne(B.value)});function ne(o){console.log("Created New Text"),d.plane.position.x=d.cube.position.x,d.scene.add(d.plane),document.createElement("canvas"),d.textMove()}function ie(){se(),oe(),ae()}function oe(){y=new U,document.body.appendChild(y.dom)}function se(){h=new X,h.shadowMap.enabled=!0,h.shadowMap.type=Y,h.setPixelRatio(window.devicePixelRatio),h.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(h.domElement),d=new ee(m,h),H.push(d),new J,new k(800,800),C()}function ae(){window.addEventListener("resize",re,!1),window.addEventListener("pointermove",de)}function re(){d.onWindowResize()}function de(o){m.pointerPosition.x=o.clientX/window.innerWidth*2-1,m.pointerPosition.y=-(o.clientY/window.innerHeight)*2+1}function C(){switch(requestAnimationFrame(()=>{C()}),W.getDelta(),m.activeView){case 0:d.update(W);break}y&&y.update(),h.render(H[m.activeView].scene,H[m.activeView].camera)}ie();
