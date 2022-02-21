import { Container, Graphics, Point, Text } from "pixi.js";

export class Lines {
    root: Container = new Container();
    graphics: Graphics = new Graphics();

    isOver = false;
    isPressed = false;

    constructor(x: number, y: number, w: number, h: number, text?: string) {
    

        this.graphics.interactive = true;
        // this.graphics.buttonMode = true;
        // this.graphics.on('pointerover', () => {this.isOver = true})
        // this.graphics.on('pointerout', () => {this.isOver = false})
        // this.graphics.on('pointerdown', () => {this.isPressed = true})
        // this.graphics.on('pointerup', () => {this.isPressed = false})

        this.root.addChild(this.graphics)
    }

    update() {
        // this.root.position.set(this.position.x, this.position.y);
        this.graphics.clear()
    }

    on(eventType: string, callback: EventListener) {
        this.graphics.on(eventType, callback)
    }
}