"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatepixi_ts_electron_quickstart"]("main_window",{

/***/ "./src/renderer/Views/ViewOne.ts":
/*!***************************************!*\
  !*** ./src/renderer/Views/ViewOne.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ViewOne = void 0;\r\nvar three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\");\r\nvar GLTFLoader_js_1 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\r\nvar BaseView_1 = __webpack_require__(/*! ./BaseView */ \"./src/renderer/Views/BaseView.ts\");\r\nvar uv_grid_opengl_jpg_1 = __importDefault(__webpack_require__(/*! ../assets/textures/uv_grid_opengl.jpg */ \"./src/renderer/assets/textures/uv_grid_opengl.jpg\"));\r\nvar whale_gltf_1 = __importDefault(__webpack_require__(/*! ../assets/models/whale.gltf */ \"./src/renderer/assets/models/whale.gltf\"));\r\nvar ViewOne = /** @class */ (function (_super) {\r\n    __extends(ViewOne, _super);\r\n    function ViewOne(model, renderer) {\r\n        var _this = _super.call(this, model, renderer) || this;\r\n        _this.exampleModel = new three_1.Group();\r\n        _this.exampleTexture = new three_1.Texture();\r\n        _this.group = new three_1.Group();\r\n        _this.scene.add(_this.group);\r\n        var geometryPlane = new three_1.PlaneBufferGeometry(6, 6, 10, 10);\r\n        var materialPlane = new three_1.MeshPhongMaterial({\r\n            color: 0x666666,\r\n            side: three_1.DoubleSide,\r\n            flatShading: true,\r\n        });\r\n        var uniforms = {\r\n            u_time: { type: 'f', value: 1.0 },\r\n            u_resolution: { type: 'v2', value: new three_1.Vector2(800, 800) },\r\n            // u_mouse: { type: 'v2', value: new THREE.Vector2() },\r\n        };\r\n        _this.shaderMat = new three_1.ShaderMaterial({\r\n            uniforms: uniforms,\r\n            vertexShader: model.vertexShader,\r\n            fragmentShader: model.fragmentShader,\r\n            side: three_1.DoubleSide,\r\n        });\r\n        _this.lightAmbient = new three_1.AmbientLight(0x333333);\r\n        _this.scene.add(_this.lightAmbient);\r\n        _this.lightPoint = new three_1.PointLight(0xffffff);\r\n        _this.lightPoint.position.set(-0.5, 0.5, 4);\r\n        _this.lightPoint.castShadow = true;\r\n        _this.lightPoint.intensity = 0.25;\r\n        _this.scene.add(_this.lightPoint);\r\n        var mapSize = 1024; // Default 512\r\n        var cameraNear = 0.5; // Default 0.5\r\n        var cameraFar = 500; // Default 500\r\n        _this.lightPoint.shadow.mapSize.width = mapSize;\r\n        _this.lightPoint.shadow.mapSize.height = mapSize;\r\n        _this.lightPoint.shadow.camera.near = cameraNear;\r\n        _this.lightPoint.shadow.camera.far = cameraFar;\r\n        var textureMaterial;\r\n        var textureLoader = new three_1.TextureLoader();\r\n        textureLoader.load(uv_grid_opengl_jpg_1.default, function (texture) {\r\n            texture.wrapS = texture.wrapT = three_1.RepeatWrapping;\r\n            texture.anisotropy = _this.renderer.capabilities.getMaxAnisotropy();\r\n            _this.exampleTexture = texture;\r\n            textureMaterial = new three_1.MeshBasicMaterial({ map: texture });\r\n            var modelLoader = new GLTFLoader_js_1.GLTFLoader();\r\n            modelLoader.load(whale_gltf_1.default, function (gltf) {\r\n                _this.exampleModel = gltf.scene;\r\n                // console.log(this.exampleModel);\r\n                _this.exampleModel.scale.set(0.01, 0.01, 0.01);\r\n                _this.exampleModel.position.x = 20;\r\n                _this.group.add(_this.exampleModel);\r\n            });\r\n        }, undefined, function (err) {\r\n            console.log(err);\r\n        });\r\n        return _this;\r\n    }\r\n    ViewOne.prototype.update = function (clock, delta) {\r\n        this.shaderMat.uniforms.u_time.value += delta;\r\n        // group.rotateZ(delta);\r\n        this.group.rotation.set(0, 0, this.model.groupAngle);\r\n        this.group.position.set(this.model.groupX, this.model.groupY, 0);\r\n        // if (this.exampleModel != undefined) {\r\n        // \tthis.exampleModel.rotateX(0.01);\r\n        // \tthis.exampleModel.rotateY(0.01);\r\n        // }\r\n        // if (this.exampleTexture) {\r\n        // \tthis.exampleTexture.center.set(0.5, 0.5);\r\n        // \tthis.exampleTexture.rotation += clock.getDelta();\r\n        // }\r\n    };\r\n    return ViewOne;\r\n}(BaseView_1.BaseView));\r\nexports.ViewOne = ViewOne;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxLQUFLLENBQUM7UUFFOUMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBS2pFLHdDQUF3QztRQUN4QyxvQ0FBb0M7UUFDcEMsb0NBQW9DO1FBQ3BDLElBQUk7UUFFSiw2QkFBNkI7UUFDN0IsNkNBQTZDO1FBQzdDLHFEQUFxRDtRQUNyRCxJQUFJO0lBRUwsQ0FBQztJQUNGLGNBQUM7QUFBRCxDQUFDLENBOUc0QixtQkFBUSxHQThHcEM7QUE5R1ksMEJBQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXhpLXRzLWVsZWN0cm9uLXF1aWNrc3RhcnQvLi9zcmMvcmVuZGVyZXIvVmlld3MvVmlld09uZS50cz80ZTEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdE1lc2gsXG5cdFJlbmRlcmVyLFxuXHRCb3hHZW9tZXRyeSxcblx0TWVzaFBob25nTWF0ZXJpYWwsXG5cdEFtYmllbnRMaWdodCxcblx0UG9pbnRMaWdodCxcblx0R3JvdXAsXG5cdE1hdGVyaWFsLFxuXHRUZXh0dXJlTG9hZGVyLFxuXHRSZXBlYXRXcmFwcGluZyxcblx0VGV4dHVyZSxcblx0TWVzaEJhc2ljTWF0ZXJpYWwsXG5cdFdlYkdMUmVuZGVyZXIsXG5cdFBsYW5lQnVmZmVyR2VvbWV0cnksXG5cdERvdWJsZVNpZGUsXG5cdENsb2NrLFxuXHRTaGFkZXJNYXRlcmlhbCxcblx0VmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBCYXNlVmlldyB9IGZyb20gXCIuL0Jhc2VWaWV3XCI7XG5cbmltcG9ydCB0ZXh0dXJlUGF0aCBmcm9tICcuLi9hc3NldHMvdGV4dHVyZXMvdXZfZ3JpZF9vcGVuZ2wuanBnJ1xuaW1wb3J0IG1vZGVsUGF0aCBmcm9tICcuLi9hc3NldHMvbW9kZWxzL3doYWxlLmdsdGYnXG5cbmV4cG9ydCBjbGFzcyBWaWV3T25lIGV4dGVuZHMgQmFzZVZpZXd7XG5cblx0Z3JvdXA6IEdyb3VwO1xuXHRjdWJlOiBNZXNoO1xuXHRwbGFuZTogTWVzaDtcblx0ZXhhbXBsZU1vZGVsOiBHcm91cDtcblx0ZXhhbXBsZVRleHR1cmU6IFRleHR1cmU7XG5cblx0bGlnaHRBbWJpZW50OiBBbWJpZW50TGlnaHQ7XG5cdGxpZ2h0UG9pbnQ6IFBvaW50TGlnaHQ7XG5cblx0c2hhZGVyTWF0OiBTaGFkZXJNYXRlcmlhbDtcblxuXHRjb25zdHJ1Y3Rvcihtb2RlbDogYW55LCByZW5kZXJlcjogV2ViR0xSZW5kZXJlcil7XG5cdFx0c3VwZXIobW9kZWwsIHJlbmRlcmVyKTtcblxuXHRcdHRoaXMuZXhhbXBsZU1vZGVsID0gbmV3IEdyb3VwKCk7XG5cdFx0dGhpcy5leGFtcGxlVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XG5cdFx0dGhpcy5ncm91cCA9IG5ldyBHcm91cCgpO1xuXHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMuZ3JvdXApO1xuXG5cdFx0Y29uc3QgZ2VvbWV0cnlQbGFuZSA9IG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDYsIDYsIDEwLCAxMCk7XG5cdFx0Y29uc3QgbWF0ZXJpYWxQbGFuZSA9IG5ldyBNZXNoUGhvbmdNYXRlcmlhbCh7XG5cdFx0XHRjb2xvcjogMHg2NjY2NjYsXG5cdFx0XHRzaWRlOiBEb3VibGVTaWRlLFxuXHRcdFx0ZmxhdFNoYWRpbmc6IHRydWUsXG5cdFx0fSk7XG5cdFx0XG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB7XG5cdFx0XHR1X3RpbWU6IHsgdHlwZTogJ2YnLCB2YWx1ZTogMS4wIH0sXG5cdFx0XHR1X3Jlc29sdXRpb246IHsgdHlwZTogJ3YyJywgdmFsdWU6IG5ldyBWZWN0b3IyKDgwMCwgODAwKSB9LFxuXHRcdFx0Ly8gdV9tb3VzZTogeyB0eXBlOiAndjInLCB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSB9LFxuXHRcdH07XG5cdFxuXHRcdHRoaXMuc2hhZGVyTWF0ID0gbmV3IFNoYWRlck1hdGVyaWFsKHtcblx0XHRcdHVuaWZvcm1zOiB1bmlmb3Jtcyxcblx0XHRcdHZlcnRleFNoYWRlcjogbW9kZWwudmVydGV4U2hhZGVyLFxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IG1vZGVsLmZyYWdtZW50U2hhZGVyLFxuXHRcdFx0c2lkZTogRG91YmxlU2lkZSxcblx0XHR9KTtcblxuXG5cblx0XHR0aGlzLmxpZ2h0QW1iaWVudCA9IG5ldyBBbWJpZW50TGlnaHQoMHgzMzMzMzMpO1xuXHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRBbWJpZW50KTtcblxuXHRcdHRoaXMubGlnaHRQb2ludCA9IG5ldyBQb2ludExpZ2h0KDB4ZmZmZmZmKTtcblx0XHR0aGlzLmxpZ2h0UG9pbnQucG9zaXRpb24uc2V0KC0wLjUsIDAuNSwgNCk7XG5cdFx0dGhpcy5saWdodFBvaW50LmNhc3RTaGFkb3cgPSB0cnVlO1xuXHRcdHRoaXMubGlnaHRQb2ludC5pbnRlbnNpdHkgPSAwLjI1O1xuXHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRQb2ludCk7XG5cblx0XHRjb25zdCBtYXBTaXplID0gMTAyNDsgLy8gRGVmYXVsdCA1MTJcblx0XHRjb25zdCBjYW1lcmFOZWFyID0gMC41OyAvLyBEZWZhdWx0IDAuNVxuXHRcdGNvbnN0IGNhbWVyYUZhciA9IDUwMDsgLy8gRGVmYXVsdCA1MDBcblx0XHR0aGlzLmxpZ2h0UG9pbnQuc2hhZG93Lm1hcFNpemUud2lkdGggPSBtYXBTaXplO1xuXHRcdHRoaXMubGlnaHRQb2ludC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSBtYXBTaXplO1xuXHRcdHRoaXMubGlnaHRQb2ludC5zaGFkb3cuY2FtZXJhLm5lYXIgPSBjYW1lcmFOZWFyO1xuXHRcdHRoaXMubGlnaHRQb2ludC5zaGFkb3cuY2FtZXJhLmZhciA9IGNhbWVyYUZhcjtcblxuXHRcdGxldCB0ZXh0dXJlTWF0ZXJpYWw6IE1hdGVyaWFsO1xuXHRcdFxuXHRcdGxldCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRleHR1cmVMb2FkZXIoKVxuXHRcdHRleHR1cmVMb2FkZXIubG9hZCh0ZXh0dXJlUGF0aCwgKHRleHR1cmUpID0+IHtcblx0XHRcdHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gUmVwZWF0V3JhcHBpbmc7XG5cdFx0XHR0ZXh0dXJlLmFuaXNvdHJvcHkgPSB0aGlzLnJlbmRlcmVyLmNhcGFiaWxpdGllcy5nZXRNYXhBbmlzb3Ryb3B5KCk7XG5cblx0XHRcdHRoaXMuZXhhbXBsZVRleHR1cmUgPSB0ZXh0dXJlO1xuXG5cdFx0XHR0ZXh0dXJlTWF0ZXJpYWwgPSBuZXcgTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUgfSk7XG5cblxuXHRcdFx0Y29uc3QgbW9kZWxMb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG5cdFx0XHRtb2RlbExvYWRlci5sb2FkKG1vZGVsUGF0aCwgKGdsdGYpID0+IHtcblx0XHRcdFx0dGhpcy5leGFtcGxlTW9kZWwgPSBnbHRmLnNjZW5lO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmV4YW1wbGVNb2RlbCk7XG5cblx0XHRcdFx0dGhpcy5leGFtcGxlTW9kZWwuc2NhbGUuc2V0KDAuMDEsIDAuMDEsIDAuMDEpO1xuXHRcdFx0XHR0aGlzLmV4YW1wbGVNb2RlbC5wb3NpdGlvbi54ID0gMjA7XG5cblxuXHRcdFx0XHR0aGlzLmdyb3VwLmFkZCh0aGlzLmV4YW1wbGVNb2RlbCk7XG5cdFx0XHR9KTtcblx0XHR9LCB1bmRlZmluZWQsIChlcnIpPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKGNsb2NrOiBDbG9jaywgZGVsdGE6IG51bWJlcik6IHZvaWQge1xuXG5cdFx0dGhpcy5zaGFkZXJNYXQudW5pZm9ybXMudV90aW1lLnZhbHVlICs9IGRlbHRhO1xuXG5cdFx0Ly8gZ3JvdXAucm90YXRlWihkZWx0YSk7XG5cdFx0dGhpcy5ncm91cC5yb3RhdGlvbi5zZXQoMCwgMCwgdGhpcy5tb2RlbC5ncm91cEFuZ2xlKTtcblx0XHR0aGlzLmdyb3VwLnBvc2l0aW9uLnNldCh0aGlzLm1vZGVsLmdyb3VwWCwgdGhpcy5tb2RlbC5ncm91cFksIDApO1xuXG5cblxuXG5cdFx0Ly8gaWYgKHRoaXMuZXhhbXBsZU1vZGVsICE9IHVuZGVmaW5lZCkge1xuXHRcdC8vIFx0dGhpcy5leGFtcGxlTW9kZWwucm90YXRlWCgwLjAxKTtcblx0XHQvLyBcdHRoaXMuZXhhbXBsZU1vZGVsLnJvdGF0ZVkoMC4wMSk7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gaWYgKHRoaXMuZXhhbXBsZVRleHR1cmUpIHtcblx0XHQvLyBcdHRoaXMuZXhhbXBsZVRleHR1cmUuY2VudGVyLnNldCgwLjUsIDAuNSk7XG5cdFx0Ly8gXHR0aGlzLmV4YW1wbGVUZXh0dXJlLnJvdGF0aW9uICs9IGNsb2NrLmdldERlbHRhKCk7XG5cdFx0Ly8gfVxuXHRcdFxuXHR9XG59XG5cbmludGVyZmFjZSBnbHRmTWVzaCBleHRlbmRzIFRIUkVFLk9iamVjdDNEPFRIUkVFLkV2ZW50PiB7XG5cdG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/renderer/Views/ViewOne.ts\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d105bd9623d94f9b833b")
/******/ })();
/******/ 
/******/ }
);