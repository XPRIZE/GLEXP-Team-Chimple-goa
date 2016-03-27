class City_1_State extends Phaser.State {
preload () {
	
    this.game.load.json('assets/city/Json', 'assets/navigate/city/newCity.json');
    this.game.load.image("assets/city/Aeroplane", "assets/navigate/city/Aeroplane.png");
	this.game.load.image("assets/city/Airport", "assets/navigate/city/Airport.png");
	this.game.load.image("assets/city/Ambulance", "assets/navigate/city/Ambulance.png");
	this.game.load.image("assets/city/Bank", "assets/navigate/city/Bank.png");
	this.game.load.image("assets/city/Cafe", "assets/navigate/city/Cafe.png");
	this.game.load.image("assets/city/FireEngine", "assets/navigate/city/FireEngine.png");
	this.game.load.image("assets/city/FireStation", "assets/navigate/city/FireStation.png");
    this.game.load.image("assets/city/Garden", "assets/navigate/city/Garden.png");
    this.game.load.image("assets/city/green", "assets/navigate/city/green.png");
    this.game.load.image("assets/city/Hospital", "assets/navigate/city/Hospital.png");
    this.game.load.image("assets/city/House", "assets/navigate/city/House.png");
    this.game.load.image("assets/city/Park1", "assets/navigate/city/Park1.png");
    this.game.load.image("assets/city/Park2", "assets/navigate/city/Park2.png");
    this.game.load.image("assets/city/Park3", "assets/navigate/city/Park3.png");
    this.game.load.image("assets/city/PoliceStation", "assets/navigate/city/PoliceStation.png");
    this.game.load.image("assets/city/PoliceCar", "assets/navigate/city/PoliceCar.png");
    this.game.load.image("assets/city/Road", "assets/navigate/city/Road.png");
    this.game.load.image("assets/city/Road_Light", "assets/navigate/city/Road_Light.png");
    this.game.load.image("assets/city/School", "assets/navigate/city/School.png");
    this.game.load.image("assets/city/SchoolBus", "assets/navigate/city/SchoolBus.png");
    this.game.load.image("assets/city/SchoolGround", "assets/navigate/city/SchoolGround.png");
    this.game.load.image("assets/city/SchoolGround", "assets/navigate/city/SchoolGround.png");
    this.game.load.image("assets/city/Tree", "assets/navigate/city/Tree.png");
    
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game, null, 0.4469989)); //, null, 0.4469
    this.game.iso.anchor.setTo(0.9, -0.5);
}
    
create () {
        
	this.map_array = new Array;
	this.isoGroup = this.game.add.group();
	this.tree_isoGroup = this.game.add.group();
	var phaserJSON = this.game.cache.getJSON("assets/city/Json");

    this.layer1 = phaserJSON.layers[0].data;  // grass layer
  
    this.isoGroup.scale.setTo(0.5,0.5);
    this.tree_isoGroup.scale.setTo(0.5,0.5);
  
  
    this.green_tile = phaserJSON.tilesets[0];
    this.bank_tile = phaserJSON.tilesets[1];
    this.policeCar_tile = phaserJSON.tilesets[2];
    this.policeStation_tile = phaserJSON.tilesets[3];
    this.road_tile = phaserJSON.tilesets[4]; 
    this.cafe_tile = phaserJSON.tilesets[5];
    this.garden_tile = phaserJSON.tilesets[6];
    this.roadLight_tile = phaserJSON.tilesets[7];
    this.SchoolGround_tile = phaserJSON.tilesets[8];
    this.school_tile = phaserJSON.tilesets[9];
    this.fireEngine_tile = phaserJSON.tilesets[10]; 
    this.fireStation_tile = phaserJSON.tilesets[11]; 
    this.hospital_tile = phaserJSON.tilesets[12];
    this.ambulance_tile = phaserJSON.tilesets[13];
    this.house_tile = phaserJSON.tilesets[14];
    this.airport_tile = phaserJSON.tilesets[15]; 
    this.aeroplane_tile = phaserJSON.tilesets[16];
    this.park1_tile = phaserJSON.tilesets[17];
    this.park2_tile = phaserJSON.tilesets[18];
    this.park3_tile = phaserJSON.tilesets[19];
    this.tree_tile = phaserJSON.tilesets[20];
    
    this.layer2 = phaserJSON.layers[1].data; // Road layer
    this.layer3 = phaserJSON.layers[2].data; // Tree layer
    this.layer4 = phaserJSON.layers[3].data; // building layer
  
    this.worldTiles();
  // this.game.add.image(this.game.width - 50, 0, "assets/Home");
    this.game.add.button(this.game.width - 50, 0, "assets/Home", function(){ this.game.state.start('bootState')});
    //"assets/Home"
	// Provide a 3D position for the cursor
	this.cursorPos = new Phaser.Plugin.Isometric.Point3();

	// console.log("group = "+ this.tree_isoGroup);
    }
update(){
       
        this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);
        this.isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y)
            if (!tile.selected) {
                tile.selected = true;
                tile.inputEnabled = true;
                if ( tile.key == "assets/city/Bank"){
                     
                     tile.events.onInputDown.add(function(){this.moveInsideView("bank", 0.8, -1.2)}, this);
                }
                       
                 if ( tile.key == "assets/city/PoliceStation"){
                      
                      tile.events.onInputDown.add(function(){this.moveInsideView("policestation", 0.6, -1.0)}, this);
                 }
                       
                 if ( tile.key == "assets/city/House"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("house", 0.099, -1.8)}, this);
                 }    
                 
                 if ( tile.key == "assets/city/FireStation"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("firestation", 0.1, -1.3)}, this);
                 } 
                 
                  if ( tile.key == "assets/city/Hospital"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("hospital", 0.01, -0.8)}, this);
                 }
                 
                  if ( tile.key == "assets/city/Cafe"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("cafe", 0.2, -0.6)}, this);
                 }
                 
                  if ( tile.key == "assets/city/School"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("school", 0.8, -1.5)}, this);
                 }      
                 
                 if ( tile.key == "assets/city/Park1" || tile.key == "assets/city/Park2" || tile.key == "assets/city/Park3"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("park", -0.3, -1.6)}, this);
                 }  
                 
                 if ( tile.key == "assets/city/Airport" || tile.key == "assets/city/Aeroplane"){
                     
                    tile.events.onInputDown.add(function(){this.moveInsideView("airport", -0.5, -1.2)}, this);
                 }    
            }
            else if (tile.selected ) {
                tile.selected = false;
            }
        }, this);
    }
    
// moveToBank(tile) {
//         console.log("bank");
        
//     this.game.add.tween(this.game.iso.anchor).to({x:0.8 , y:-1.2}, 2000, Phaser.Easing.Cubic.Out, true).start(); //Phaser.Easing.Linear.None 
//     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start(); //Phaser.Easing.Linear.None
//     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//     } 
    
// moveToPoliceStation (tile) {
//         console.log("PoliceStation");
        
//     this.game.add.tween(this.game.iso.anchor).to({x:0.6 , y:-1.0}, 2000, Phaser.Easing.Cubic.Out, true).start();
    
//     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
   
 
//     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//     }
    
// moveToHouse(tile) {
        
//         console.log("House");
        
//     this.game.add.tween(this.game.iso.anchor).to({x:0.099 , y:-1.8}, 2000, Phaser.Easing.Cubic.Out, true).start();   
//     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();

//     }
    
// moveToFireStation (tile) {
//         console.log("FirStation");
//         this.game.add.tween(this.game.iso.anchor).to({x:0.1 , y:-1.3}, 2000, Phaser.Easing.Cubic.Out, true).start();
//         this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//         this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//     }
    
// moveToHospital (tile) {
//        console.log("Hospital");
//         this.game.add.tween(this.game.iso.anchor).to({x:0.01 , y:-0.8}, 2000, Phaser.Easing.Cubic.Out, true).start();
//         this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//         this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    
//     }
    
// moveToCafe (tile) {
//         console.log("cafe");
//         this.game.add.tween(this.game.iso.anchor).to({x:0.2 , y:-0.6}, 2000, Phaser.Easing.Cubic.Out, true).start();
//         this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//         this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    
//     }
    
// moveToSchool (tile) {
//         console.log("school");
//         this.game.add.tween(this.game.iso.anchor).to({x:0.8 , y:-1.5}, 2000, Phaser.Easing.Cubic.Out, true).start();
//         this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//         this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    
//     }
// moveToPark (tile) {
//         console.log("park");
//         this.game.add.tween(this.game.iso.anchor).to({x:-0.3 , y:-1.6}, 2000, Phaser.Easing.Cubic.Out, true).start();
//         this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
//         this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    
// }

moveInsideView(name, xx, yy){
        
        console.log(name);
       // console.log(" cubic = "+Phaser.Easing.Cubic.In);
        this.game.add.tween(this.game.iso.anchor).to({x:xx , y:yy}, 2000, Phaser.Easing.Cubic.Out, true).start();  
        this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
        this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
        setTimeout(function() {
             this.game.state.start("gameState", true, false, name);
        }, 2500);
       
    }

worldTiles() {
      //  console.log("in tile");
 
        for( let i=0; i < 4; i++){
           
        var tile;
        var temp = 0;
        if (i == 0){
             this.map_array = this.layer1;
        } else if( i == 1){
           this.map_array = this.layer2;
        } else if( i == 2){
            this.map_array = this.layer3;
        } else {
            this.map_array = this.layer4;
        }
       //ss  console.log( "layer = "+ this.map_array);
        for (var yy = 0; yy <  3270; yy += 218) {
            for (var xx = 0; xx < 3270; xx += 218) {
                if (this.green_tile.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/green", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.bank_tile.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Bank", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.policeCar_tile.firstgid == this.map_array[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/PoliceCar", 0, this.isoGroup);
                     temp++;
                     tile.anchor.set(0.5, 1);
                } else if (this.policeStation_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "assets/city/PoliceStation", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.road_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "assets/city/Road", 0, this.isoGroup);
                     temp++; 
                     tile.anchor.set(0.5, 1);
                } else if (this.cafe_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Cafe", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                } else if (this.garden_tile.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Garden", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.roadLight_tile.firstgid == this.map_array[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Road_Light", 0, this.isoGroup);
                     temp++;
                     tile.anchor.set(0.5, 1);
                } else if (this.SchoolGround_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "assets/city/SchoolGround", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.school_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "assets/city/School", 0, this.isoGroup);
                     temp++; 
                     tile.anchor.set(0.5, 1);
                } else if (this.fireEngine_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/FireEngine", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                } else if (this.fireStation_tile.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/FireStation", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.hospital_tile.firstgid == this.map_array[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Hospital", 0, this.isoGroup);
                     temp++;
                     tile.anchor.set(0.5, 1);
                } else if (this.ambulance_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "assets/city/Ambulance", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.house_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "assets/city/House", 0, this.isoGroup);
                     temp++; 
                     tile.anchor.set(0.5, 1);
                } else if (this.airport_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Airport", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                } else if (this.aeroplane_tile.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Aeroplane", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.park1_tile.firstgid == this.map_array[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Park1", 0, this.isoGroup);
                     temp++;
                     tile.anchor.set(0.5, 1);
                } else if (this.park2_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "assets/city/Park2", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.park3_tile.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "assets/city/Park3", 0, this.isoGroup);
                     temp++; 
                     tile.anchor.set(0.5, 1);
                } else if (this.tree_tile.firstgid == this.map_array[temp]) {
             //       console.log("tree = "+ i +"  " + temp)
                    tile = this.game.add.isoSprite(xx, yy, 0, "assets/city/Tree", 0, this.tree_isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.2, 0.8);
                } else {
                    temp++;
                } 
            }
            }
      }
      this.tree_isoGroup.forEach(function (tile) {
           this.game.add.tween(tile).to({angle: -1}, 250).to({angle: 1}, 250).loop().start();
         }, this);
  }
}
export default City_1_State;
