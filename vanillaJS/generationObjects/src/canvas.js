import * as PIXI from 'pixi.js'
export default class Canvas {
    constructor(texture) {
        this.container = new PIXI.Container();
        this.background = texture;
        
        this.setCanvas();
    }

    setCanvas() {
        const canvas = new PIXI.Sprite(this.background);
        canvas.position.set(window.innerWidth/2 - 480, window.innerHeight/2 - 268);
        this.container.addChild(canvas);
    }
}