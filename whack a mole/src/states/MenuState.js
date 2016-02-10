
class MenuState extends Phaser.State {

	create () {
     //   console.log('in menu 1');
        var size = 60;
        var height = 130;
        this.game.add.image(0, 0, 'level1');
        let a = this.game.add.image (size, height, 'a');
       // console.log("A ide  before" + a);
        a.inputEnabled = true;
        a.events.onInputDown.add(this.play_a, this);
        this.game.add.tween(a).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        let b = this.game.add.image (size += a.width + 10, height, 'b');
        b.inputEnabled = true;
        b.events.onInputDown.add(this.play_b, this);
        this.game.add.tween(b).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        let c = this.game.add.image (size += b.width + 10 , height,'c');
        c.inputEnabled = true;
        c.events.onInputDown.add(this.play_c, this);
        this.game.add.tween(c).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let d = this.game.add.image (size += c.width + 10, height, 'd');
        d.inputEnabled = true;
        d.events.onInputDown.add(this.play_d, this);
        this.game.add.tween(d).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let e = this.game.add.image (size += d.width +10, height, 'e');
        e.inputEnabled = true;
        e.events.onInputDown.add(this.play_e, this);
        this.game.add.tween(e).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        size = 60;
        height += a.height;
        
        let f = this.game.add.image (size, height, 'f');
        f.inputEnabled = true;
        f.events.onInputDown.add(this.play_f, this);
        this.game.add.tween(f).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let g = this.game.add.image (size += f.width + 10, height, 'g');
        g.inputEnabled = true;
        g.events.onInputDown.add(this.play_g, this);
        this.game.add.tween(g).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let h = this.game.add.image (size += g.width + 10 , height,'h');
        h.inputEnabled = true;
        h.events.onInputDown.add(this.play_h, this);
        this.game.add.tween(h).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let i = this.game.add.image (size += h.width + 10, height, 'i');
        i.inputEnabled = true;
        i.events.onInputDown.add(this.play_i, this);
        this.game.add.tween(i).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        let j = this.game.add.image (size += i.width +10, height, 'j');
        j.inputEnabled = true;
        j.events.onInputDown.add(this.play_j, this);
        this.game.add.tween(j).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        size = 60;
        height += f.height;
        
        let k = this.game.add.image (size, height, 'k');
        k.inputEnabled = true;
        k.events.onInputDown.add(this.play_k, this);
        this.game.add.tween(k).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let l = this.game.add.image (size += k.width + 10, height, 'l');
        l.inputEnabled = true;
        l.events.onInputDown.add(this.play_l, this);
        this.game.add.tween(l).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let m = this.game.add.image (size += l.width + 10 , height,'m');
        m.inputEnabled = true;
        m.events.onInputDown.add(this.play_m, this);
        this.game.add.tween(m).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let n = this.game.add.image (size += m.width + 10, height, 'n');
        n.inputEnabled = true;
        n.events.onInputDown.add(this.play_n, this);
        this.game.add.tween(n).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
        
        let right = this.game.add.image (size += n.width +10 + j.width/2, height + n.height/2, 'right');
        right.inputEnabled = true;
        right.anchor.set(0.5, 0.5);
        right.events.onInputDown.add(this.next_level, this);
        
        // add music
         
         this.music = this.game.add.audio('backgroundMusic');
         this.music.loop = true;
         this.music.play();
       
	}
    
       next_level () {
       // console.log('in next  level');
        
       this.game.state.start('loadlevel2');
       this.music.stop();
    }
    
    
    ///this show one type of background
    
    play_a () {
         this.game._stage = 1;
         this.game.state.start('load1');
         this.music.stop();
    }
    play_f () {
         this.game._stage = 2;
         this.game.state.start('load1');
         this.music.stop();
    }
    play_k () {
         this.game._stage = 3;
         this.game.state.start('load1');
         this.music.stop();
    }
    
   // background 2 
    play_b (){
         this.game._stage = 1;
         this.game.state.start('load2');
         this.music.stop();
    }
    
    play_g () {
        this.game._stage = 2;
         this.game.state.start('load2');
         this.music.stop();
    }
    play_l () {
        this.game._stage = 3;
         this.game.state.start('load2');
         this.music.stop();
    }
    
    // background 3
    play_c () {
         this.game._stage = 1;
         this.game.state.start('load3');
         this.music.stop();
    }
    play_h () {
         this.game._stage = 2;
         this.game.state.start('load3');
         this.music.stop();
    }
    play_m () {
         this.game._stage = 3;
         this.game.state.start('load3');
         this.music.stop();
    }
    
    // background 4
    
    play_d () {
         this.game._stage = 1;
         this.game.state.start('load4');  
         this.music.stop();
    }
    play_i () {
         this.game._stage = 2;
         this.game.state.start('load4');
         this.music.stop();
    }
    play_n () {
         this.game._stage = 3;
         this.game.state.start('load4');
         this.music.stop();
    }
    
    // background 5
    
    play_e () {
         this.game._stage = 1;
         this.game.state.start('load5');
         this.music.stop();
    }
    play_j () {
         this.game._stage = 2;
         this.game.state.start('load5');
         this.music.stop();
    }

}
export default MenuState;
