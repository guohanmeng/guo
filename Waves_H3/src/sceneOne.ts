import { Point, Polygon, Sprite, Graphics } from 'pixi.js'
import { lerp } from './easing';
import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneOne extends Scene {

    constructor(model: Model) {
        super(model)
    }

    update(): void {
        super.update()
        let tempColor = this.model.buttonData.firstColor.slice(0)
        tempColor = '0x' + tempColor;
        this.background.clear();
        this.background.beginFill(tempColor);
        this.background.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.background.endFill();

    }
}