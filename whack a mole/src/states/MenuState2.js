class MenuState extends Phaser.State {

	create () {
        
        let size = 60;
        let height = 130;
        this.game.add.image(0, 0, 'level2');
        
        
        let left = this.game.add.image (size + 50, height + 50, 'left');
        left.inputEnabled = true;
        left.events.onInputDown.add(this.privious_Level, this);
        let o = this.game.add.image (size += 220 + 10, height, 'o');
        o.inputEnabled = true;
        o.events.onInputDown.add(this.play_o, this);
        this.game.add.tween(o).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let p = this.game.add.image (size += o.width + 10 , height,'p');
        p.inputEnabled = true;
        p.events.onInputDown.add(this.play_p, this);
        this.game.add.tween(p).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let q = this.game.add.image (size += p.width + 10, height, 'q');
        q.inputEnabled = true;
        q.events.onInputDown.add(this.play_q, this);
        this.game.add.tween(q).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let r = this.game.add.image (size += q.width +10, height, 'r');
        r.inputEnabled = true;
        r.events.onInputDown.add(this.play_r, this);
        this.game.add.tween(r).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        size = 60;
        height += o.height;
        
        let s = this.game.add.image (size, height, 's');
        s.inputEnabled = true;
        s.events.onInputDown.add(this.play_s, this);
        this.game.add.tween(s).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let t = this.game.add.image (size += s.width + 10, height, 't');
        t.inputEnabled = true;
        t.events.onInputDown.add(this.play_t, this);
        this.game.add.tween(t).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let u = this.game.add.image (size += t.width + 10 , height,'u');
        u.inputEnabled = true;
        u.events.onInputDown.add(this.play_u, this);
        this.game.add.tween(u).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let v = this.game.add.image (size += u.width + 10, height, 'v');
        v.inputEnabled = true;
        v.events.onInputDown.add(this.play_v, this);
        this.game.add.tween(v).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let w = this.game.add.image (size += v.width +10, height, 'w');
        w.inputEnabled = true;
        w.events.onInputDown.add(this.play_w, this);
        this.game.add.tween(w).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        size = 60;
        height += s.height;
        
        let x = this.game.add.image (size, height, 'x');
        x.inputEnabled = true;
        x.events.onInputDown.add(this.play_x, this);
        this.game.add.tween(x).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let y = this.game.add.image (size += x.width + 10, height, 'y');
        y.inputEnabled = true;
        y.events.onInputDown.add(this.play_y, this);
        this.game.add.tween(y).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let z = this.game.add.image (size += y.width + 10 , height,'z');
        z.inputEnabled = true;
        z.events.onInputDown.add(this.play_z, this);
        this.game.add.tween(z).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
   
       
       this.music = this.game.add.audio('backgroundMusic');
       this.music.loop = true;
       this.music.play();
    
	}
    
     ///this show one type of background
    
    play_s () {
         this.game._stage = 4;
         this.game.state.start('load1');
         this.music.stop();
    }
    play_x () {
         this.game._stage = 5;
         this.game.state.start('load1');
         this.music.stop();
    }
   // background 2 
    play_o (){
         this.game._stage = 4;
         this.game.state.start('load2');
         this.music.stop();
    }
    
    play_t () {
        this.game._stage = 5;
         this.game.state.start('load2');
         this.music.stop();
    }
    play_y () {
        this.game._stage = 6;
         this.game.state.start('load2');
         this.music.stop();
    }
    
    // background 3
    play_p () {
        this.game._stage = 4;
        this.game.state.start('load3'); 
        this.music.stop();
    }
    play_u () {
        this.game._stage = 5;
        this.game.state.start('load3');
        this.music.stop();
    }
    play_z () {
        this.game._stage = 6;
        this.game.state.start('load3');
        this.music.stop();
    }
    
    // background 4
    
    play_q() {
         this.game._stage = 4;
         this.game.state.start('load4');
         this.music.stop();
    }
    play_v () {
        this.game._stage = 5;
         this.game.state.start('load4');
         this.music.stop();
    }
    
    // background 5
    
    play_r () {
         this.game._stage = 3;
         this.game.state.start('load5');
         this.music.stop();
    }
    play_w () {
         this.game._stage = 4;
         this.game.state.start('load5');
         this.music.stop();
    }
       
    
    privious_Level () {
        this.game.state.start('loadlevel');
        this.music.stop();
    }
}
export default MenuState;