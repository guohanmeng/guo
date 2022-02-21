import { Container, Graphics } from "pixi.js";
import { Lines } from "./lines";
import { Model } from "./model";

export class Scene {
    model: Model;
    container: Container;
    // lines: Lines;

    constructor(model: Model) {
        this.model = model;
        // this.lines = new Lines();
        this.container = new Container();
        this.container.sortableChildren = true;
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight

    
    }

    update() { }
}