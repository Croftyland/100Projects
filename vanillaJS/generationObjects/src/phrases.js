import * as PIXI from "pixi.js";

export default class Phrases {
    constructor(showWinningText) {
		this.container = new PIXI.Container();
		this.showWinningText = showWinningText;
        this.money = 5;
        this.bet = 5;
        this.width = 100;
        this.height = 100;
		this.position = {x:700,y:480};
		this.val = 'Coins: '
		
		this.textLine();
		
    }
    textLine() {
        let style = {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '36px',
			fill : '#F7EDCA',
			stroke : '#4a1850',
			strokeThickness : 5,
			dropShadow : true,
			dropShadowColor : '#000000',
			dropShadowAngle : Math.PI / 6,
			dropShadowDistance : 6,
			wordWrap : true,
			wordWrapWidth : 440
		};
		this.text = new PIXI.Text(this.val + this.money, style);
		this.text.x = this.position.x;
		this.text.y = this.position.y;
		
		this.container.addChild(this.text)
	} 

	updateText(){
		this.text.text=this.val + this.money;
	}
	
    showLosingText(){
		let style = {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '36px',
			fill : '#F7EDCA',
			stroke : '#4a1850',
			strokeThickness : 5,
			dropShadow : true,
			dropShadowColor : '#000000',
			dropShadowAngle : Math.PI / 6,
			dropShadowDistance : 6,
			wordWrap : true,
			wordWrapWidth : 440
		};
        
        this.tryText = new PIXI.Text("Reset game", style);
        this.tryText.position.x = 670;
        this.tryText.position.y = 550;

        this.tryText.interactive = true;
        this.tryText.buttonMode = true;
		this.container.addChild(this.tryText);
        this.tryText.on('click', ()=>{
            this.tryText.text = "";
			this.resetBalance();
			
        });
    }
  
    makeBet() {
		this.money -= this.bet;
		 this.updateText();   
	}
	checkMoney(){
        return this.money > 0
    }

    addWin() {
		let style = {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '36px',
			fill : '#F7EDCA',
			stroke : '#4a1850',
			strokeThickness : 5,
			dropShadow : true,
			dropShadowColor : '#000000',
			dropShadowAngle : Math.PI / 6,
			dropShadowDistance : 6,
			wordWrap : true,
			wordWrapWidth : 440
		};
		this.money += this.bet*2;
        this.textWin = new PIXI.Text('YOU WON!', style);
        this.textWin.position.x = 680;
        this.textWin.position.y = 165;
        this.container.addChild(this.textWin);
        setTimeout(()=>{
			this.textWin.alpha = 0;
        }, 3000);
		this.updateText();

	}
	
	resetBalance(){
        this.money = 10;
		this.updateText();
	
    }
}