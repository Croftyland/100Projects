import * as PIXI from 'pixi.js'

export default class Controller {
    constructor() {
        this.width = null;
        this.height = null;
        this.stopCount = 0;
        this.stage = new PIXI.Container();
    }

    createRenderer() {
        this.renderer = PIXI.autoDetectRenderer({width: this.width, height: this.height, transparent: true});

        document.getElementById('root').appendChild(this.renderer.view);

        this.renderer.render(this.stage);
    }

    stageAdd(item) {
        this.stage.addChild(item);
        this.renderer.render(this.stage);
    }

    onStartSpin() {
        this.stopCount = 0;
        this.drums.rotate(this.onEndSpin.bind(this));
    }

    onEndSpin() {
        this.stopCount++;
        if (this.stopCount === 3) {
            this.button.activate();
            this.drums.checkRows(this.drums.finalResult)
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.stage);
    }
}