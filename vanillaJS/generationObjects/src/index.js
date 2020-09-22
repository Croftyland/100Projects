// Import Application class that is the main part of our PIXI project
import {Application} from '@pixi/app'

// In order that PIXI could render things we need to register appropriate plugins
import {Renderer} from '@pixi/core'
import * as PIXI from 'pixi.js' //Renderer is the class that is going to register plugins

import {BatchRenderer} from '@pixi/core' // BatchRenderer is the "plugin" for drawing sprites
Renderer.registerPlugin('batch', BatchRenderer)

// And just for convenience let's register Loader plugin in order to use it right from Application instance like app.loader.add(..) etc.
import {AppLoaderPlugin} from '@pixi/loaders'

import { Sprite } from '@pixi/sprite'

Application.registerPlugin(AppLoaderPlugin)


// Sprite is our image on the stage
const app = new PIXI.Application({ width: 800, height: 450 });
document.body.appendChild(app.view);

const background = Sprite.from('./assets/BG.png');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

app.loader
	.add('./assets/Bet_Line.png', './assets/Bet_Line.png')
	.add('./assets/BG.png', './assets/BG.png')
	.add('./assets/BTN_Spin_d.png', './assets/BTN_Spin_d.png')
	.add('./assets/BTN_Spin.png', './assets/BTN_Spin.png')
    .add('./assets/SYM1.png', './assets/SYM1.png')
    .add('./assets/SYM3.png', './assets/SYM3.png')
    .add('./assets/SYM4.png', './assets/SYM4.png')
	.add('./assets/SYM5.png', './assets/SYM5.png')
	.add('./assets/SYM6.png', './assets/SYM6.png')
	.add('./assets/SYM7.png', './assets/SYM7.png')
    .load(onAssetsLoaded);

const REEL_WIDTH = 200;
const SYMBOL_SIZE = 155;

// onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    // Create different slot symbols.
    const slotTextures = [
        PIXI.Texture.from('./assets/SYM1.png'),
        PIXI.Texture.from('./assets/SYM3.png'),
        PIXI.Texture.from('./assets/SYM4.png'),
		PIXI.Texture.from('./assets/SYM5.png'),
		PIXI.Texture.from('./assets/SYM6.png'),
		PIXI.Texture.from('./assets/SYM7.png'),
	];

	
	app.loader.load(() => {
    const sprite = Sprite.from('./assets/BTN_Spin.png')
    sprite.anchor.set(0.5) // We want to rotate our sprite relative to the center, so 0.5
    app.stage.addChild(sprite)

    // Position the sprite at the center of the stage
    sprite.x = app.screen.width * 0.91
    sprite.y = app.screen.height * 0.5

    // Put the rotating function into the update loop
    app.ticker.add(delta => {
        sprite.rotation += 0.02 * delta
	})
	sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.addListener('pointerdown', () => {
        startPlay();
    });
})
	
    // Build the reels
    const reels = [];
	const reelContainer = new PIXI.Container();
	reelContainer.x = app.screen.width * 0.1
	reelContainer.y = app.screen.height * 0.05
    for (let i = 0; i < 3; i++) {
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 4; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 3);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);


    let running = false;

    // Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete() {
        running = false;
    }

    // Listen for animate update.
    app.ticker.add((delta) => {
    // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // Update blur filter y amount based on speed.
            // This would be better if calculated with time in mind also. Now blur depends on frame rate.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });
}

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}
// Listen for animate update.
app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}