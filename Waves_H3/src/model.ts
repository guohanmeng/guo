import { Point } from "pixi.js";

export class Model {
    private static instance: Model

    buttonData: any = {
        width: 200,
        height: 100,
        firstColor: '#000000',
        secondColor: '#FFDA00',
        thirdColor: '#ffffff'
    };

    mousePos: Point = new Point(window.innerWidth, 0);

    elapsedTime: number = 0;
    sceneState: SceneState = SceneState.first;

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getInstance(): Model{
        return Model.instance
    }
}

export enum SceneState{
    first = 'scene one',
    second = 'scene two'
}