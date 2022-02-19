import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneTwo extends Scene {

    constructor(model: Model) {
        super(model)

        // this.button.on('pointerdown', () => {
        //     this.model.sceneState = SceneState.first
        //     this.button.isPressed = false
        //     console.log(this.model.sceneState);
        // })
        // this.button.position.x = 100
        // this.button.position.y = 200
    }

    update(): void {
        super.update()

        let tempColor = this.model.buttonData.secondColor.slice(0)
        tempColor = '0x' + tempColor;
        this.background.clear();
        this.background.beginFill(tempColor);
        this.background.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.background.endFill();
        // this.button.fill = tempColor;
        // this.button.width = this.model.buttonData.width;
        // this.button.height = this.model.buttonData.height;
        // this.button.update()
    }
}