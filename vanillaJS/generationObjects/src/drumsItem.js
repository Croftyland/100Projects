import * as PIXI from "pixi.js";

export default class DrumsItem {
    constructor(resources){
        this.width = 236;
        this.height = 140;
        this.stesh = {};
        this.animation = true;
        this.position = {x: 0, y: 0 };
        this.delayStop = 0;
        this.resources = resources;
        this.blocks = [
            { id: 0, texture: this.resources.sym_1.texture },
            { id: 1, texture: this.resources.sym_2.texture },
            { id: 2, texture: this.resources.sym_3.texture },
            { id: 3, texture: this.resources.sym_4.texture },
            { id: 4, texture: this.resources.sym_5.texture },
        ];

        this.container = new PIXI.Container();
        this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        let reelIds = this.blocks.map(item => item.id).sort(() => 0.5 - Math.random());

        this.createTurn(reelIds);
        this.createBlocks();

    }

    createTurn(turn) {
        let turned = [];
        for (let i = 0; i < turn.length; i++) {
            this.blocks.forEach(item => {
                if (item.id === turn[i]) turned.push(item)
            })
        }
        this.blocks = turned;
    }

    createBlocks() {
        for(let i = 0; i < this.blocks.length; i++) {
           let item = new PIXI.Sprite(this.blocks[i].texture);
            item.scale.set(0.8);
            item.position.y = i * this.height;
            this.stesh[`id_${this.blocks[i].id}`] = item;
            this.container.addChild(item);
        }
    }

    startRotation(selected, func) {
        this.animation = true;
        let ids = Object.keys(this.stesh);
        this.selected = selected[0];
        this.stopAnimation();
        this.startAnimation(selected, func);
        selected.forEach((item, index) => {
            this.stesh[ids[index]].texture = this.resources[`sym_${item+1}`].texture;
            this.blocks[index].id = item;
        });
       
    }

    startAnimation(selected, func) {
        let ids = Object.keys(this.stesh);
        let selectedReel = this.stesh[ids[1]].position.y;

        if (!this.animation &&
            selectedReel%this.height==0 &&
            selectedReel === this.height){
            func();
            return false;
        }


        for (let i = 0; i < this.blocks.length; i++) {
            let current = this.stesh[ids[i]];
            current.position.y -= this.height/7;
            if (current.position.y <= -this.height) {
                current.position.y = (this.blocks.length - 1) * this.height;
            }
        }

        requestAnimationFrame(this.startAnimation.bind(this, selected, func));
    }

    stopAnimation() {
        let delay = 3000 + this.delayStop;
        setTimeout(() => this.animation = false, delay);
    }
}