import { Container, Graphics } from "pixi.js";
import { Button } from "./button";
import { Model } from "./model";

export class Scene {
    model: Model;
    container: Container;
    // button: Button;
    background: Graphics;

    constructor(model: Model) {
        this.model = model;

        this.container = new Container();
        this.container.sortableChildren = true;
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight

        this.background = new Graphics();
        this.background.beginFill(0xFFDA00);
        this.background.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.container.addChild(this.background);
    
    }

    update() { }
}