import * as PIXI from "pixi.js";

export default class Button {
    constructor(onSpin, stopAnimation, texture_active, texture_inactive) {
        this.onSpin = onSpin;
        this.stopAnimation = stopAnimation
        this.button = null;
        this.texture_active = texture_active;
        this.texture_inActive = texture_inactive;

        this.container = new PIXI.Container();
        this.active = true;

        this.initialize();
        this.bindClick();
    }

    initialize() {
        this.activeBtn = this.texture_active;
        this.inactiveBtn = this.texture_inActive;
        this.container.position.set(window.innerWidth/2 + 393, window.innerHeight/2);

        this.button = this.createButton();

        this.container.addChild(this.button);
    }

    createButton() {
        let btn = new PIXI.Sprite(this.activeBtn);
        btn.buttonMode = true;
        btn.interactive = true;
        btn.scale.set(1, 1);
        btn.anchor.set(0.5, 0.5);
        return btn;
    }

    bindClick() {
        this.button.on('click', this.onClick.bind(this));
        this.button.on("mousedown", () => {
            if(this.active) {
                this.button.scale.set(1.2);
            }
        });
        this.button.on("mouseup", () => {
            this.button.scale.set(0.9);
        });
    }

    onClick() {
        if (!this.active){
            this.stopAnimation();
            return
        }
        this.activate();
        this.onSpin();
    }

    activate() {
        this.active = !this.active;
        this.button.texture = this.active ? this.activeBtn : this.inactiveBtn;
    }
}