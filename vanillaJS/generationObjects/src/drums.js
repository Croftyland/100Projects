import DrumsItem from './drumsItem.js';
import * as PIXI from "pixi.js";
import {randomArrayHelper, checkIfWin} from "./apis/randomArrayHelper"
import Phrases from './phrases.js'


export default class Drum {
    constructor(toggleButton,resources, phrases) {
        this.phrases = phrases;
        this.toggleButton = toggleButton;
        this.resources = resources;
        this.x = 125;
        this.y = 10;
        this.delayStop = 500;
        this.columnPadding = 8;
    
        this.gameResults = []
        this.drums = Array.from({ length: 3 }, () => new DrumsItem(this.resources));
        this.phrases = new Phrases();
        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.addChild(this.phrases.container);
     
        this.addDrum();
         
    }


    addDrum() {
 
        for (let i = 0; i < this.drums.length; i++) {
            let drum = this.drums[i];
            drum.delayStop = this.delayStop * i;
            drum.container.position.x = (drum.width + this.columnPadding) * i;
            this.container.addChild(drum.container);
        }
    }

    rotate(fn) {
        if(this.phrases.checkMoney()) {
            this.finalResult = [];

            if (this.text && this.text.text) {
                this.text.text = '';
                this.textWrapper.alpha = 0;
            }
            const randomArray = randomArrayHelper(this.gameResults);

            for (let i = 0; i < this.drums.length; i++) {
                let drum = this.drums[i];
                let random = randomArray[i];
                drum.startRotation(random, fn);
                this.finalResult.push(random);
                if (this.gameResults.length === 4) {
                    this.gameResults = [];
                }
            }
            this.phrases.makeBet();
        }
        else {
            this.phrases.showLosingText();
        }
    }


    checkRows(result) {
        if (checkIfWin(result).result) {
            this.gameResults.push(1);
            this.phrases.addWin();
        }
        else 
            this.gameResults.push(0);
    }


    stopAnimationImmidiatly(){
        this.drums.drums.forEach(drum => {
            drum.animation = false
        })
    }
}