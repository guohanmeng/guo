// Assignment 2 - Xinyu Liu Carrot

import * as PIXI from "pixi.js"
import { PI_2, Sprite } from "pixi.js";
// import * as Filters from 'pixi-filters'
let Texture: object[] = [];
let RedContainer, PinkContainer;
let xin, chun, kuai, le;
let spd = 1.5;

// main function
const main = async () => {

    let app = new PIXI.Application();

    // Application Display
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // app.renderer.backgroundColor = 0xFFF0D9;
    app.renderer.backgroundColor = 0xFFB200;
    Texture[0] = PIXI.Texture.from('assets/1.svg');
    Texture[1] = PIXI.Texture.from('assets/2.svg');
    Texture[2] = PIXI.Texture.from('assets/3.svg');
    Texture[3] = PIXI.Texture.from('assets/4.svg');
    Texture[4] = PIXI.Texture.from('assets/5.svg');
    Texture[5] = PIXI.Texture.from('assets/6.svg');
    Texture[6] = PIXI.Texture.from('assets/7.svg');
    Texture[7] = PIXI.Texture.from('assets/8.svg');
    Texture[8] = PIXI.Texture.from('assets/9.svg');
    Texture[9] = PIXI.Texture.from('assets/10.svg');
    Texture[10] = PIXI.Texture.from('assets/11.svg');
    Texture[11] = PIXI.Texture.from('assets/12.svg');
    Texture[12] = PIXI.Texture.from('assets/13.svg');
    Texture[13] = PIXI.Texture.from('assets/14.svg');
    Texture[14] = PIXI.Texture.from('assets/15.svg');
    Texture[15] = PIXI.Texture.from('assets/16.svg');
    Texture[16] = PIXI.Texture.from('assets/17.svg');
    Texture[17] = PIXI.Texture.from('assets/18.svg');
    Texture[18] = PIXI.Texture.from('assets/19.svg');
    Texture[19] = PIXI.Texture.from('assets/20.svg');
    Texture[20] = PIXI.Texture.from('assets/21.svg');
    Texture[21] = PIXI.Texture.from('assets/22.svg');
    Texture[22] = PIXI.Texture.from('assets/23.svg');
    Texture[23] = PIXI.Texture.from('assets/24.svg');
    xin = PIXI.Texture.from('assets/新.png');
    chun = PIXI.Texture.from('assets/春.png');
    kuai = PIXI.Texture.from('assets/快.png');
    le = PIXI.Texture.from('assets/乐.png');

    // Assign object
    let graph1 = new PIXI.Graphics();
    let RedContainer = new PIXI.Container();
    let PinkContainer = new PIXI.Container();
    let graph3 = new PIXI.Graphics();

    // draw character rect
    for(let q = 0; 60 + q * 120 < window.innerHeight + 120; q++){
        for(let p = 0; 60 + p * 120 < window.innerWidth + 120; p++){
            
            graph3.beginFill(0xAA381E, 1);
            graph3.pivot.x = 60;
            graph3.pivot.y = 60;
            graph3.drawRoundedRect(60 + p * 120, 60  + q * 120, 120, 120, 36);
 
        }
    }

app.stage.addChild(graph3);

    // draw character xin
    for(let m = 0; 18 + m * 240 < window.innerHeight + 120; m++){
        for(let n = 0; 18 + n * 240 < window.innerWidth + 120; n++){
            let spr = new PIXI.Sprite(xin);
            // spr.anchor.set(0.5, 0.5);
            spr.x = 18 + n * 240;
            spr.y = 18 + m * 240;
            spr.scale.set(0.8, 0.8);
            app.stage.addChild(spr);
        } 
    }


    // draw character le
    for(let m = 0; 20 + m * 240 < window.innerHeight + 120; m++){
        for(let n = 0; 139 + n * 240 < window.innerWidth + 120; n++){
            let spr = new PIXI.Sprite(le);
            // spr.anchor.set(0.5, 0.5);
            spr.x = 139 + n * 240;
            spr.y = 20 + m * 240;
            spr.scale.set(0.8, 0.8);
            app.stage.addChild(spr);
        } 
    }

        // draw character kuai
        for(let m = 0; 135 + m * 240 < window.innerHeight + 120; m++){
            for(let n = 0; 135 + n * 240 < window.innerWidth + 120; n++){
                let spr = new PIXI.Sprite(kuai);
                // spr.anchor.set(0.5, 0.5);
                spr.x = 135 + n * 240;
                spr.y = 135 + m * 240;
                spr.scale.set(0.8, 0.8);
                app.stage.addChild(spr);
            } 
        }

        // draw character chun
        for(let m = 0; 130 + m * 240 < window.innerHeight + 120; m++){
            for(let n = 0; 12 + n * 240 < window.innerWidth + 120; n++){
                let spr = new PIXI.Sprite(chun);
                // spr.anchor.set(0.5, 0.5);
                spr.x = 12 + n * 240;
                spr.y = 130 + m * 240;
                spr.scale.set(0.9, 0.9);
                app.stage.addChild(spr);
            } 
        }

    for(let q = 0; 60 + q * 240 < window.innerHeight + 120; q++){
        for(let p = 0; 60 + p * 240 < window.innerWidth + 120; p++){
            
            graph1.beginFill(0xFFF0D9, 1);
            graph1.pivot.x = 60;
            graph1.pivot.y = 60;
            graph1.drawRoundedRect(60 + p * 240, 60  + q * 240, 120, 120, 30);

            graph1.beginFill(0xAA381E, 1);
            graph1.pivot.x = 60;
            graph1.pivot.y = 60;
            graph1.drawCircle(120 + p * 240, 120 + q * 240, 50);
            
        }
    }
    RedContainer.addChild(graph1);

    let graph2 = new PIXI.Graphics();
       // draw primitives
    for(let q = 0; 60 + q * 240 < window.innerHeight + 120; q++){
        for(let p = 0; 60 + p * 240 < window.innerWidth + 120; p++){
            
            // big rect
            graph2.beginFill(0xE27676, 1);
            graph2.pivot.x = 60;
            graph2.pivot.y = 60;
            graph2.drawRoundedRect(180 + p * 240, 180 + q * 240, 120, 120, 30);
            
            // small circles
            graph2.beginFill(0xFDDDE6, 1);
            graph2.pivot.x = 60;
            graph2.pivot.y = 60;
            graph2.drawCircle(240 + p * 240, 270 + q * 240, 30);
            graph2.drawCircle(270 + p * 240, 240 + q * 240, 30);
            graph2.drawCircle(210 + p * 240, 240 + q * 240, 30);
            graph2.drawCircle(240 + p * 240, 210 + q * 240, 30);

            // center circle
            graph2.beginFill(0xE27676, 1);
            graph2.pivot.x = 60;
            graph2.pivot.y = 60;
            graph2.drawCircle(240 + p * 240, 240 + q * 240, 39)        
        }
    }
    PinkContainer.addChild(graph2);
   

    // draw sprites first row
    for(let m = 0; 60 + m * 240 < window.innerHeight + 180; m++){
        for(let n = 0; 60 + n * 240 < window.innerWidth + 180; n++){
            let index = Math.floor(Math.random() * 6 + 12);
            let spr = new PIXI.Sprite(Texture[index]); // not sure 
            spr.anchor.set(0.5, 0.5);
            spr.x = 60 + n * 240;
            spr.y = 60 + m * 240;
            spr.scale.set(0.4, 0.4);
            spr.tint = 0xFFF0D9; 
            RedContainer.addChild(spr);
        } 
    }

    

    // draw sprites second row
    for(let m = 0; 180 + m * 240 < window.innerHeight + 180; m++){
        for(let n = 0; 180 + n * 240 < window.innerWidth + 180; n++){
            let index = Math.floor(Math.random() * 12);
            let spr = new PIXI.Sprite(Texture[index]);
            spr.anchor.set(0.5, 0.5);
            spr.x = 180 + n * 240;
            spr.y = 180 + m * 240;
            spr.scale.set(0.4, 0.4);
            spr.tint = 0xFFF0D9;// ?? not sure why tint is not working here...
            PinkContainer.addChild(spr);
        } 
    }

    // add containers to the stage
    app.stage.addChild(RedContainer);
    app.stage.addChild(PinkContainer);
    

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);

    // animation
    app.ticker.add((delta) => {
        // Red boxes container
        if(RedContainer.x == 0 && RedContainer.y < 120){
            RedContainer.y += spd;
        } else if(RedContainer.x < 120 && RedContainer.y >= 120){
            RedContainer.x += spd;
        } else if(RedContainer.x == 120 && RedContainer.y > 0){
            RedContainer.y -= spd;
        } else if(RedContainer.x >= 0 && RedContainer.y <= 0){
            RedContainer.x -= spd;
        }

        // Pink boxes container
        if(PinkContainer.x == 0 && PinkContainer.y > - 120){
            PinkContainer.y -= spd;
        } else if(PinkContainer.x > - 120 && PinkContainer.y == - 120){
            PinkContainer.x -= spd;
        } else if(PinkContainer.x == - 120 && PinkContainer.y < 0){
            PinkContainer.y += spd;
        } else if(PinkContainer.x <= 0 && PinkContainer.y >= - 120){
            PinkContainer.x += spd;
        }
    });
};


main();

