class BootState extends Phaser.State {

preload () {
		this.game.load.image("assets/main","assets/main.png");
        this.game.load.image("assets/Village","assets/Village.png");
        this.game.load.image("assets/Syria-City","assets/Syria-City.png");
        this.game.load.image("assets/City","assets/City.png");
        this.game.load.image("assets/City1","assets/City1.png");
        this.game.load.image("assets/Home","assets/Home.png");
	}
    
create () {
        this.game.stage.backgroundColor = "#808080";
        
        let syria_City = this.game.add.image(this.game.width/2 +25, 210, "assets/Syria-City");
        syria_City.anchor.setTo(0.5, 1);
        syria_City.inputEnabled = true;
        syria_City.events.onInputDown.add(this.moveToSyria, this);
        
        let village = this.game.add.image(this.game.width/2 -195, this.game.height/2 + 75, "assets/Village");
        village.anchor.setTo(1, 1);
        village.inputEnabled = true;
        village.events.onInputDown.add(this.moveToVillage, this);
        
        let city1 = this.game.add.image(this.game.width/2 +100, this.game.height/2 + 180, "assets/City1");
        city1.anchor.setTo(0.2, 0.2);
        city1.inputEnabled = true;
        city1.events.onInputDown.add(this.moveToCity1, this);
        
        let city = this.game.add.image(550, 320, "assets/City");
        city.anchor.setTo(1, 1);
        city.inputEnabled = true;
        city.events.onInputDown.add(this.moveToCity, this);
        
        this.game.add.image(this.game.width/2, this.game.height/2, "assets/main").anchor.setTo(0.5, 0.5);
        
        this.game.add.tween(syria_City.scale).to({x: 1.2, y: 1.2}, 2500).to({x: 1, y: 1}, 2500).loop().start(); 
        this.game.add.tween(village.scale).to({x: 1.2, y: 1.2}, 2500).to({x: 1, y: 1}, 2500).loop().start(); 
        this.game.add.tween(city1.scale).to({x: 1.2, y: 1.2}, 2500).to({x: 1, y: 1}, 2500).loop().start();
        this.game.add.tween(city.scale).to({x: 1.1, y: 1.1}, 2500).to({x: 1, y: 1}, 2500).loop().start();
        
       let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Chimple Town');
       text.anchor.set(0.5, 0.5);
       text.align = 'center';
       text.font = 'Arial Black';
       text.fontSize = 30;
       text.fontWeight = 'bold';
       text.fill = '#0000ff'; 
       this.game.add.tween(text.scale).to({x: 1.4, y: 1.4}, 2500).to({x: 1, y: 1}, 2500).loop().start();
    }
    
update(){
       
       
    } 
    
moveToSyria() {
    // console.log("in syria");
    this.game.state.start('exampleState');
    }
    
moveToVillage() {
    // console.log("Village");
  //  this.game.state.start('bootState2');
    }
    
moveToCity() {
    // console.log("City");
    this.game.state.start('city1State');
    }
    
moveToCity1() {
    // console.log("City1");
    this.game.state.start('city2State');
    }
    
}
export default BootState;
