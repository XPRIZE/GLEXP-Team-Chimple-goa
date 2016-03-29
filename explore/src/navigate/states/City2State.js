import ConsoleBar from '../../util/ConsoleBar.js';

class City_2_State extends Phaser.State {

preload () {
	
    this.game.load.json('assets/city_1/newCity2', 'assets/navigate/city_1/newCity2.json');
	this.game.load.image("assets/city_1/Bank", "assets/navigate/city_1/Bank.png");
    this.game.load.image("assets/city_1/Bank_front","assets/navigate/city_1/Bank_front.png");
    this.game.load.image("assets/city_1/Basic tile","assets/navigate/city_1/Basic tile.png");
	this.game.load.image("assets/city_1/Cafe", "assets/navigate/city_1/Cafe.png");
    this.game.load.image("assets/city_1/Cafe_front", "assets/navigate/city_1/Cafe_front.png");
	this.game.load.image("assets/city_1/Fire_station", "assets/navigate/city_1/Fire_station.png");
    this.game.load.image("assets/city_1/Garden_01", "assets/navigate/city_1/Garden_01.png");
    this.game.load.image("assets/city_1/Garden_02", "assets/navigate/city_1/Garden_02.png");
    this.game.load.image("assets/city_1/Garden_03", "assets/navigate/city_1/Garden_03.png");
    this.game.load.image("assets/city_1/Garden_04", "assets/navigate/city_1/Garden_04.png");
    this.game.load.image("assets/city_1/Garden_05", "assets/navigate/city_1/Garden_05.png");
    this.game.load.image("assets/city_1/Grocery", "assets/navigate/city_1/Grocery.png");
    this.game.load.image("assets/city_1/Hospital", "assets/navigate/city_1/Hospital.png");
    this.game.load.image("assets/city_1/House", "assets/navigate/city_1/House.png");
    this.game.load.image("assets/city_1/House_front", "assets/navigate/city_1/House_front.png");
    this.game.load.image("assets/city_1/Police_Station", "assets/navigate/city_1/Police_Station.png");
    this.game.load.image("assets/city_1/Police_Station_front", "assets/navigate/city_1/Police_Station_front.png");
    this.game.load.image("assets/city_1/Post_Office", "assets/navigate/city_1/Post_Office.png");
    this.game.load.image("assets/city_1/Road_H", "assets/navigate/city_1/Road_H.png");
    this.game.load.image("assets/city_1/Road_V", "assets/navigate/city_1/Road_V.png");
    this.game.load.image("assets/city_1/School", "assets/navigate/city_1/School.png");
    this.game.load.image("assets/city_1/Tree", "assets/navigate/city_1/Tree.png");
    this.game.load.image("assets/city_1/Tree_01", "assets/navigate/city_1/Tree_01.png");
    this.game.load.image("assets/city_1/Tree_02", "assets/navigate/city_1/Tree_02.png");
    this.game.load.image("assets/city_1/Veh_01", "assets/navigate/city_1/Veh_01.png");
    this.game.load.image("assets/city_1/Veh_02", "assets/navigate/city_1/Veh_02.png");
    this.game.load.image("assets/city_1/Veh_03", "assets/navigate/city_1/Veh_03.png");
    this.game.load.image("assets/city_1/Veh_04", "assets/navigate/city_1/Veh_04.png");
    this.game.load.image("assets/city_1/Veh_05", "assets/navigate/city_1/Veh_05.png");
    this.game.load.image("assets/city_1/Veh_06", "assets/navigate/city_1/Veh_06.png");
    this.game.load.image("assets/city_1/Veh_07", "assets/navigate/city_1/Veh_07.png");
    this.game.load.image("assets/city_1/Veh_08", "assets/navigate/city_1/Veh_08.png");
    var isometric = require('../../../node_modules/phaser-plugin-isometric/dist/phaser-plugin-isometric.js');
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game, null, 0.5));
    this.game.iso.anchor.setTo(0.9, -0.75);
	}
    
    
    
 create () {
        
	this.map_array = new Array;
	this.isoGroup = this.game.add.group();
	this.tree_isoGroup = this.game.add.group();
	var phaserJSON = this.game.cache.getJSON('assets/city_1/newCity2');
    this.layer1 = phaserJSON.layers[0].data;  // grass layer
    this.layer2 = phaserJSON.layers[1].data; // Road layer
    this.layer3 = phaserJSON.layers[2].data; // Tree layer
    this.layer4 = phaserJSON.layers[3].data; // building layer
    this.layer5 = phaserJSON.layers[4].data;
    this.isoGroup.scale.setTo(0.5,0.5);
    this.tree_isoGroup.scale.setTo(0.5,0.5);
    this.basic_tile = phaserJSON.tilesets[0];
    this.road_H_tile = phaserJSON.tilesets[1];
    this.road_V_tile = phaserJSON.tilesets[2];
    this.tree_tile = phaserJSON.tilesets[3];
    this.tree_01_tile = phaserJSON.tilesets[4]; 
    this.house_tile = phaserJSON.tilesets[5];
    this.house_front_tile = phaserJSON.tilesets[6];
    this.postOffice_tile = phaserJSON.tilesets[7];
    this.hospital_tile = phaserJSON.tilesets[8];
    this.school_tile = phaserJSON.tilesets[9];
    this.cafe_tile = phaserJSON.tilesets[10]; 
    this.cafe_front_tile = phaserJSON.tilesets[11]; 
    this.police_station_tile = phaserJSON.tilesets[12];
    this.grocery_tile = phaserJSON.tilesets[13];
    this.bank_tile = phaserJSON.tilesets[14];
    this.bank_front_tile = phaserJSON.tilesets[15]; 
    this.fir_station_tile = phaserJSON.tilesets[16];
    this.garden01_tile = phaserJSON.tilesets[17];
    this.garden02_tile = phaserJSON.tilesets[18];
    this.garden03_tile = phaserJSON.tilesets[19];
    this.garden04_tile = phaserJSON.tilesets[20];
    this.garden05_tile = phaserJSON.tilesets[21];
    this.vech01_tile = phaserJSON.tilesets[22];
    this.vech02_tile = phaserJSON.tilesets[23];
    this.vech03_tile = phaserJSON.tilesets[24];
    this.vech04_tile = phaserJSON.tilesets[25];
    this.vech05_tile = phaserJSON.tilesets[26];
    this.vech06_tile = phaserJSON.tilesets[27];
    this.vech07_tile = phaserJSON.tilesets[28];
    this.vech08_tile = phaserJSON.tilesets[29];
  
    this.worldTiles();
    
  //  this.game.add.image(this.game.width - 50, 0, "assets/Home");
    this.game.add.button(this.game.width - 50, 0, "assets/Home", function(){ this.game.state.start('bootState')});
   	// Provide a 3D position for the cursor
	this.cursorPos = new Phaser.Plugin.Isometric.Point3();

	// console.log("group = "+ this.tree_isoGroup);
    this.game.add.existing(new ConsoleBar(this.game));
    
    }
 update(){
     
     this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);
     this.isoGroup.forEach(function (tile) {
     var inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y)
     if (!tile.selected) {
          tile.selected = true;
          tile.inputEnabled = true;
                if ( tile.key == "assets/city_1/Bank"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("bank", 0.099 ,-1.8)}, this);
                }     
                 if ( tile.key == "assets/city_1/Fire_station"){ 
                      tile.events.onInputDown.add(function(){this.moveInsideView("firestation", 0.4 ,-2)}, this);
                 }      
                 if ( tile.key == "assets/city_1/Cafe"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("cafe", 0.7 ,-1.8)}, this);
                 } 
                  if ( tile.key == "assets/city_1/House"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("house", 0.8 ,-1.5)}, this);
                 }  
                 if ( tile.key == "assets/city_1/Post_Office"){  
                     tile.events.onInputDown.add(function(){this.moveInsideView("postoffice", 0.8 ,-1)}, this);
                 } 
                 if ( tile.key == "assets/city_1/Hospital"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("hospital", 0.4 ,-1)}, this);
                 }  
                  if ( tile.key == "assets/city_1/Grocery"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("grocery", 0.05 ,-1.4)}, this);
                 }  
                  if ( tile.key == "assets/city_1/Police_Station"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("policestation", 0.2 ,-1.5)}, this);
                 }  
                  if ( tile.key == "assets/city_1/School"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("school", 0.2 ,-0.6)}, this);
                 }   
                 
                 if ( tile.key == "assets/city_1/Garden_01" || tile.key == "assets/city_1/Garden_02" || tile.key == "assets/city_1/Garden_03" || tile.key == "assets/city_1/Garden_04" ||  tile.key == "assets/city_1/Garden_05"){
                     tile.events.onInputDown.add(function(){this.moveInsideView("park", -0.4, -1.5)}, this);
                 }      
            }
            else if (tile.selected ) {
                tile.selected = false;
            }
        }, this);
    } 
  
    // moveToBank (tile) { 
    //    this.game.add.tween(this.game.iso.anchor).to({x:0.099 , y:-1.8}, 2000, Phaser.Easing.Cubic.Out, true).start();   
    //    this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //    this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
   
    // }
    
    // moveToFireStation (tile){
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.4 , y:-2}, 2000, Phaser.Easing.Cubic.Out, true).start();   
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    // }
    
    // moveToCafe (tile) {
      
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.7 , y:-1.8}, 2000, Phaser.Easing.Cubic.Out, true).start();
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();     
    // }
    
    // moveToHouse(tile){
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.8 , y:-1.5}, 2000, Phaser.Easing.Cubic.Out, true).start();
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
     
    // }
    
    // moveToPostOffice(tile) {

    //     this.game.add.tween(this.game.iso.anchor).to({x:0.8 , y:-1}, 2000, Phaser.Easing.Cubic.Out, true).start();  
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    // }

    // moveToHospital(tile){
  
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.4 , y:-1}, 2000, Phaser.Easing.Cubic.Out, true).start();   
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start(); 
    // }
    
    // moveToGrocery (tile){
  
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.05 , y:-1.4}, 2000, Phaser.Easing.Cubic.Out, true).start();   
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    // }
    
    
    // moveToPoliceStation (tile){
     
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.2 , y:-1.5}, 2000, Phaser.Easing.Cubic.Out, true).start();  
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start(); 
    // }
    
    // moveToSchool (tile) {
     
    //     this.game.add.tween(this.game.iso.anchor).to({x:0.2 , y:-0.6}, 2000, Phaser.Easing.Cubic.Out, true).start();  
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start(); 
        
    // }
    
    // moveToGarden (tile) {
     
    //     this.game.add.tween(this.game.iso.anchor).to({x:-0.4 , y:-1.5}, 2000, Phaser.Easing.Cubic.Out, true).start();  
    //     this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
    //     this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start(); 
        
    // }
    
    moveInsideView(name, xx, yy){
        
        console.log(name);
        this.game.add.tween(this.game.iso.anchor).to({x:xx , y:yy}, 2000, Phaser.Easing.Cubic.Out, true).start();  
        this.game.add.tween(this.isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
        this.game.add.tween(this.tree_isoGroup.scale).to({x:1.5 , y:1.5}, 2000,  Phaser.Easing.Linear.None, true).start();
         setTimeout(function() {
             this.game.state.start("gameState", true, false, name);
        }, 2500);
    }
    
    worldTiles() {
        for( let i=0; i < 5; i++){
            var tile;
            var temp = 0;
            if (i == 0){
                this.map_array = this.layer1;
            } else if( i == 1){
                this.map_array = this.layer2;
            } else if( i == 2){
                this.map_array = this.layer3;
            } else if(i == 3){
                this.map_array = this.layer4;
            } else {
                this.map_array = this.layer5;
            }
            for (var yy = 0; yy <  3760; yy += 188) {
                for (var xx = 0; xx < 3760; xx += 188) {
                     if (this.basic_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Basic tile", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.road_H_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Road_H", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.road_V_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Road_V", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.tree_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy , 0, "assets/city_1/Tree", 0, this.tree_isoGroup);
                            temp++;
                            tile.anchor.set(0.4, 0.8);
                        } else if (this.tree_01_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy, 0, "assets/city_1/Tree_01", 0, this.tree_isoGroup);
                            temp++; 
                            tile.anchor.set(0.7,0.5);
                        } else if ( this.house_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/House", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.house_front_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/House_front", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if ( this.postOffice_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Post_Office", 0, this.isoGroup);
                            temp++;
                             tile.anchor.set(0.5, 1);
                        } else if (this.hospital_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy , 0, "assets/city_1/Hospital", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.school_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy, 0, "assets/city_1/School", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.cafe_tile.firstgid == this.map_array[temp]) {
                             tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Cafe", 0, this.isoGroup);
                             temp++; 
                             tile.anchor.set(0.5, 1);
                        } else if (this.cafe_front_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Cafe_front", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.police_station_tile.firstgid == this.map_array[temp]){
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Police_Station", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if (this.grocery_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy , 0, "assets/city_1/Grocery", 0, this.isoGroup);
                            temp++;
                            tile.anchor.set(0.5, 1);
                        } else if ( this.bank_tile.firstgid == this.map_array[temp]) {
                             tile = this.game.add.isoSprite(xx , yy, 0, "assets/city_1/Bank", 0, this.isoGroup);
                             temp++; 
                             tile.anchor.set(0.5, 1);
                         } else if (this.bank_front_tile.firstgid == this.map_array[temp]) {
                              tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Bank_front", 0, this.isoGroup);
                              temp++; 
                              tile.anchor.set(0.5, 1);
                         } else if (this.fir_station_tile.firstgid == this.map_array[temp]){
                              tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Fire_station", 0, this.isoGroup);
                              temp++;
                              tile.anchor.set(0.5, 1);
                        } else if (this.garden01_tile.firstgid == this.map_array[temp]){
                             tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Garden_01", 0, this.isoGroup);
                             temp++;
                             tile.anchor.set(0.5, 1);
                        } else if (this.garden02_tile.firstgid == this.map_array[temp]) {
                             tile = this.game.add.isoSprite(xx , yy , 0, "assets/city_1/Garden_02", 0, this.isoGroup);
                             temp++;
                             tile.anchor.set(0.5, 1);
                        } else if (this.garden03_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx , yy, 0, "assets/city_1/Garden_03", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.garden04_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Garden_04", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        }  else if (this.garden05_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Garden_05", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                         } else if (this.vech01_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_01", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                          } else if (this.vech02_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_02", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.vech03_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_03", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                         } else if (this.vech04_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_04", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.vech05_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_05", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.vech06_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_06", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.vech07_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_07", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
                        } else if (this.vech08_tile.firstgid == this.map_array[temp]) {
                            tile = this.game.add.isoSprite(xx, yy, 0, "assets/city_1/Veh_08", 0, this.isoGroup);
                            temp++; 
                            tile.anchor.set(0.5, 1);
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
export default City_2_State;
