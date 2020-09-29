import * as PIXI from "pixi.js";

import Button from './button.js'
import Canvas from './canvas.js'
import Controller from './controller.js'
import Drums from './drums.js'
import Loader from './loader.js'


export default class App extends Controller {
    constructor() {
        super();
        this.width = 1000;
        this.height = 608;
        this.createRenderer();
        this.app = new PIXI.Application();

        new Loader(this.init.bind(this), this.app.loader);
    }
    static loaded = document.querySelector('.loading-overlay');


    init() {
        this.createCanvas();
        this.createDrum();
        this.createButton();
        this.animate();
        App.loaded.style.visibility = 'hidden';
    }

    createCanvas() {
        this.background = new Canvas(this.app.loader.resources.background.texture);
        this.stageAdd(this.background.container);
    }

    createDrum() {
        this.drums = new Drums(this.stageAdd.bind(this), this.app.loader.resources, this.toogleButton.bind(this) );
        this.stageAdd(this.drums.container);
    }

    createButton() {
        this.button = new Button(this.onStartSpin.bind(this), this.drums.stopAnimationImmidiatly.bind(this) ,this.app.loader.resources.btn_spin.texture, this.app.loader.resources.btn_spin_d.texture );
        this.stageAdd(this.button.container);
    }
    toogleButton() {
        this.button.activate()
    }
}