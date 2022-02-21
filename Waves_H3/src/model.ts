import { Point } from "pixi.js";

export class Model {
    private static instance: Model

    colorData: any = {
        firstColor: 0x000000,
        secondColor: 0xe8b309,
        thirdColor: 0xffffff
    };


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