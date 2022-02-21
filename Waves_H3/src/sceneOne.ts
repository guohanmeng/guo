import { Point, Polygon, Sprite, Graphics } from 'pixi.js'
import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneOne extends Scene {

    constructor(model: Model) {
        super(model)
    }

    update(): void {
        super.update()
        let tempColor = this.model.colorData.firstColor.slice(0)
        tempColor = '0x' + tempColor;
    }
}