/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import Demo from 'index1';

class Game1 {
    
    constructor(){

        this.wei=0;
        this.hei=0;
        
        if(navigator.userAgent.match(/iPad|Android|webOS|iPhone|iPod|Blackberry/i) )
        {
        if(window.screen.width<= window.innerWidth)
        {
            this.wei = window.screen.width;
        }
        else
            this.wei = window.innerWidth;

        if(window.screen.height<= window.innerHeight)
        {
            this.hei = window.screen.height;
        }
        else
            this.hei = window.innerHeight;

        // do mobile stuff
        }
        else
        {
            console.log('desktop');
        this.wei = window.innerWidth;
        this.hei = window.innerHeight; 
        }

            
        new Demo(this.wei*window.devicePixelRatio, this.hei*window.devicePixelRatio);

    }
    
}
new Game1();

