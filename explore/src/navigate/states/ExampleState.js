class BootState extends Phaser.State {

preload () {
    this.game.load.json('isometric', 'assets/newMap.json');
	this.game.load.image("grass","assets/grass.png");
	this.game.load.image("water","assets/water.png");
	this.game.load.image("Road","assets/Road.png");
	this.game.load.image("Build_1","assets/Building_01.png");
	this.game.load.image("Build_2","assets/Building_02.png");
	this.game.load.image("Build_3","assets/Building_03.png");
	 this.game.load.image("tree","assets/Tree.png");
   let pl =this.game.plugins.add(new Phaser.Plugin.Isometric(this.game, null, 0.5));
  // this.game.world.setBounds(0, 0, 2048, 1024);
   this.game.iso.anchor.setTo(0.5, 0.2);
   console.log("testing"+ pl);
	}
    
    
    
    create () {
        
	this.map_array = new Array;
	this.isoGroup = this.game.add.group();
	this.tree_isoGroup = this.game.add.group();
   this.game.stage.backgroundColor = '#006400';
	// Let's make a load of tiles on a grid.

 //   this.game.stage.backgroundColor = '#ffffff';
	//this.game.add.sprite(0, 0, 'assets/isometricImage');
	//  console.log("testing123456789");
	var phaserJSON = this.game.cache.getJSON('isometric');

  this.map_array = phaserJSON.layers[0].data;  // grass layer
  this.one_firstgid = phaserJSON.tilesets[0];// grass
  this.two_firstgid = phaserJSON.tilesets[1];// Road
  this.three_firstgid = phaserJSON.tilesets[2];// Tree
  this.four_firstgid = phaserJSON.tilesets[3];// Building_01
  this.five_firstgid = phaserJSON.tilesets[4]; // Building_02
  this.six_firstgid = phaserJSON.tilesets[5]; // Building_03


  this.map_array1 = phaserJSON.layers[1].data; // Road layer
  this.map_array2 = phaserJSON.layers[2].data; // Tree layer
  this.map_array3 = phaserJSON.layers[3].data; // building layer


//   console.log('information '+  this.one_firstgid.firstgid);
//   console.log('information '+  this.two_firstgid.name);
//   console.log('information '+  this.three_firstgid.name);
//   console.log('information '+  this.four_firstgid.name);
//   console.log('information '+  this.five_firstgid.name);
//   console.log('information '+  this.six_firstgid.name);

//    console.log('json = '+ phaserJSON.tilesets[0].image);
//    console.log("testing123456789 ="+ this.map_array[0]);

   this.spawnTiles();
   this.treeTile();
   this.roadTiles();

  this.buildTile();


	// Provide a 3D position for the cursor
	this.cursorPos = new Phaser.Plugin.Isometric.Point3();

	// console.log("group = "+ this.tree_isoGroup);
    }
    update(){
       
        this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);

        
        this.isoGroup.forEach(function (tile) {
     //       var inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y)
            if (!tile.selected) {
                tile.selected = true;
                tile.inputEnabled = true;
                if ( tile.key == "Build_2"){
                     
                     tile.events.onInputDown.add(function(tile){this.moveToSchool(tile)}, this);
                }
                       
                 if ( tile.key == "Build_1"){
                      
                      tile.events.onInputDown.add(function(tile){this.moveToHospital(tile)}, this);
                 }
                       
                 if ( tile.key == "Build_3"){
                     
                     tile.events.onInputDown.add(function(tile){this.moveToPlayground(tile)}, this);
                 }       
            }
            else if (tile.selected ) {
                tile.selected = false;
        //        this.game.add.tween(tile).to({ isoZ: 0 }, 100, Phaser.Easing.Quadratic.InOut, true);
            }
        }, this);
    } 
    moveToSchool(tile){
        
    //     // tile.bringToTop();
    //     this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    //     this.game.physics.isoArcade.enable(tile);
    //    this.game.camera.follow(tile);
        //this.game.camera.setSize(100, 100);
    //    console.log(tile.x);
    //    tile.reset(this.game.width /2, this.game.height/2);
   //    console.log("plugin = "+Phaser.Plugin.Isometric.ISOARCADE);
    //   tile.scale.setTo(5,5);
      
       let i=3;
       let s2 = game.add.tween(this.game.iso.anchor);
    s2.to({x:0.15 , y:0}, 2000, Phaser.Easing.Cubic.Out, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s2.start();
       
    let s = game.add.tween(this.isoGroup.scale);
    s.to({x:i , y:i++}, 2000,  Phaser.Easing.Linear.None, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s.start();
 //    this.game.camera.follow(tile);
         let s1 = game.add.tween(this.tree_isoGroup.scale);
    s1.to({x:3 , y:3}, 2000,  Phaser.Easing.Linear.None, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s1.start();
    
    
    
     
  //    this.game.iso.anchor.setTo(0.15,0);
      
     //   console.log(" tile information"+ tile.input.priorityID);
    //    console.log("in school");
   //    // tile.scale.setTo(8,8);
  //       this.game.add.tween(tile).to({  isoX: 300, isoY: 600,isoZ: 100 }, 100, Phaser.Easing.Quadratic.InOut, true);
       
        //      for( let i = 0; i<6;i++){
        //          console.log("in for loop"+ i);
        //          setTimeout(function() {
        //              console.log("delay");
        //               tile.scale.setTo(1*i,1*i);
                     
        //                  }, 1000);
        //  }
        
         
      //  tile.scale.setTo(5,5); //{ isoY:100, isoX:100, isoZ:500 }
    }
    
    moveToHospital(tile){
      
     //   tile.bringToTop();
        // this.game.physics.startSystem(Phaser.Physics.P2JS);
        // this.game.physics.p2.enable(tile);
        // this.game.camera.follow(tile);
   //     console.log("in school");
      //  tile.scale.setTo(5,5);
      
       
      let i=3;
       let s2 = game.add.tween(this.game.iso.anchor);
    s2.to({x:0.25 , y:0.1}, 2000, Phaser.Easing.Linear.In, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s2.start();
        let s = game.add.tween(this.isoGroup.scale);
    s.to({x:i , y:i++}, 2000,   Phaser.Easing.Linear.Out, true); //Phaser.Easing.Linear.None
   // s.onComplete.addOnce(this.theEnd, this);
    s.start();
        let s1 = game.add.tween(this.tree_isoGroup.scale);
    s1.to({x:3 , y:3}, 2000,   Phaser.Easing.Linear.Out, true); //Phaser.Easing.Linear.None
   // s.onComplete.addOnce(this.theEnd, this);
    s1.start();
   
         console.log("in Hospital");
    }
    
    theEnd(){
       // this.game.iso.anchor.setTo(0.25,0.1);  
    }
    moveToPlayground(tile){
        
        
      let i=3;
        let s = game.add.tween(this.isoGroup.scale);
    s.to({x:i , y:i++}, 2000,  Phaser.Easing.Quadratic.InOut, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s.start();
     this.game.iso.anchor.setTo(0.025,0.0000000999);
       
        let s1 = game.add.tween(this.tree_isoGroup.scale);
    s1.to({x:3 , y:3}, 2000,  Phaser.Easing.Quadratic.InOut, true); //Phaser.Easing.Linear.None
  //  s.onComplete.addOnce(theEnd, this);
    s1.start();
    }
    
    spawnTiles() {
        var tile;
        var temp = 0;
    //    console.log('information '+  this.one_firstgid.firstgid);
      //  console.log(this.one_firstgid.firstgid);
      /*  for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 1184; xx += 90) {
                if (this.one_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                } else if (this.two_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    temp++;
                } 
                tile.anchor.set(0.5,0);
            }
        }*/
        
        for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 664; xx += 83) {
                if (this.one_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.two_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.three_firstgid.firstgid == this.map_array[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "tree", 0, this.tree_isoGroup);
                     temp++;//- (1.2* 83)  -(1.2*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.four_firstgid.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "Build_1", 0, this.isoGroup);
                    temp++;//    -(1.2* 83)                - (1.2* 80)
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.five_firstgid.firstgid == this.map_array[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "Build_2", 0, this.isoGroup);
                     temp++; // - (3.2*83)        -(3.3*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.six_firstgid.firstgid == this.map_array[temp]) {
                 //  console.log("tile X= "+ xx);
                 
                    tile = this.game.add.isoSprite(xx, yy, 0, "Build_3", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                   //  xx = this.six_firstgid.tilewidth;
                  //   yy = this.six_firstgid.tileheight;
                }
                
            }
            }
            
              this.tree_isoGroup.forEach(function (tile) {
        this.game.add.tween(tile).to({angle: -1}, 250).to({angle: 1}, 250).loop().start();
         }, this);
    }
    
    roadTiles() {
     //   console.log("in gr = ");
         var tile;
        var temp = 0;     
        for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 664; xx += 83) {
                if (this.one_firstgid.firstgid == this.map_array1[temp]){
                 //   console.log("in grass = ");
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.two_firstgid.firstgid == this.map_array1[temp]){
                 //   console.log("in road = ")
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                  //  console.log("in road");
                } else if (this.three_firstgid.firstgid == this.map_array1[temp]){
                     tile = this.game.add.isoSprite(xx, yy, 0, "tree", 0, this.tree_isoGroup);
                     temp++;//- (1.2* 83)  -(1.2*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.four_firstgid.firstgid == this.map_array1[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "Build_1", 0, this.isoGroup);
                    temp++;//    -(1.2* 83)                - (1.2* 80)
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.five_firstgid.firstgid == this.map_array1[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "Build_2", 0, this.isoGroup);
                     temp++; // - (3.2*83)        -(3.3*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.six_firstgid.firstgid == this.map_array1[temp]){
                 //  console.log("tile X= "+ xx);
                 
                   tile = this.game.add.isoSprite(xx, yy, 0,"Build_2", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                   //  xx = this.six_firstgid.tilewidth;
                  //   yy = this.six_firstgid.tileheight;
                }
                else{
                    temp++;
                }
         //       tile.anchor.set(0.5, 1);
            }
            }
            
              this.tree_isoGroup.forEach(function (tile) {
        this.game.add.tween(tile).to({angle: -1}, 250).to({angle: 1}, 250).loop().start();
         }, this);
    }
    
    treeTile() {
         var tile;
        var temp = 0;
         for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 664; xx += 83) {
                if (this.one_firstgid.firstgid == this.map_array2[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    temp++;
                       tile.anchor.set(0.5, 1);                 
                } else if (this.two_firstgid.firstgid == this.map_array2[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.three_firstgid.firstgid == this.map_array2[temp]){
                      tile = this.game.add.isoSprite(xx, yy, 0, "tree", 0, this.tree_isoGroup);
                     temp++;//- (1.2* 83)  -(1.2*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.four_firstgid.firstgid == this.map_array2[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "Build_1", 0, this.isoGroup);
                    temp++;//    -(1.2* 83)                - (1.2* 80)
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.five_firstgid.firstgid == this.map_array2[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "Build_2", 0, this.isoGroup);
                     temp++; // - (3.2*83)        -(3.3*80)
                     tile.anchor.set(0.5, 1);
                } else  if (this.six_firstgid.firstgid == this.map_array2[temp]){
                 //  console.log("tile X= "+ xx);
                 
                    tile = this.game.add.isoSprite(xx, yy, 0, "Build_2", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                   //  xx = this.six_firstgid.tilewidth;
                  //   yy = this.six_firstgid.tileheight;
                }
                 else{
                    temp++;
                }
                
            }
            }
            
              this.tree_isoGroup.forEach(function (tile) {
        this.game.add.tween(tile).to({angle: -1}, 250).to({angle: 1}, 250).loop().start();
         }, this);
    }
    
    buildTile() {
         var tile;
        var temp = 0;
    //    console.log('information '+  this.one_firstgid.firstgid);
      //  console.log(this.one_firstgid.firstgid);
      /*  for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 1184; xx += 90) {
                if (this.one_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                } else if (this.two_firstgid.firstgid == this.map_array[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    temp++;
                } 
                tile.anchor.set(0.5,0);
            }
        }*/
        
        for (var yy = 0; yy < 640; yy += 80) {
            for (var xx = 0; xx < 664; xx += 83) {
                if (this.one_firstgid.firstgid == this.map_array3[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "grass", 0, this.isoGroup);
                    tile.anchor.set(0.5, 1);
                    temp++;
                } else if (this.two_firstgid.firstgid == this.map_array3[temp]){
                    tile = this.game.add.isoSprite(xx, yy, 0, "Road", 0, this.isoGroup);
                    temp++;
                    tile.anchor.set(0.5, 1);
                } else if (this.three_firstgid.firstgid == this.map_array3[temp]){
                      tile = this.game.add.isoSprite(xx, yy, 0, "tree", 0, this.tree_isoGroup);
                     temp++;//- (1.2* 83)  -(1.2*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.four_firstgid.firstgid == this.map_array3[temp]) {
                    tile = this.game.add.isoSprite(xx , yy , 0, "Build_1", 0, this.isoGroup);
                    temp++;//    -(1.2* 83)                - (1.2* 80)
                    tile.anchor.set(0.5, 1);
                }
                 else if (this.five_firstgid.firstgid == this.map_array3[temp]) {
                    tile = this.game.add.isoSprite(xx , yy, 0, "Build_2", 0, this.isoGroup);
                     temp++; // - (3.2*83)        -(3.3*80)
                     tile.anchor.set(0.5, 1);
                } else if (this.six_firstgid.firstgid == this.map_array3[temp]){
                 //  console.log("tile X= "+ xx);
                 
                    tile = this.game.add.isoSprite(xx, yy, 0,"Build_3", 0, this.isoGroup);
                     temp++; //-83               -80
                     tile.anchor.set(0.5, 1);
                   //  xx = this.six_firstgid.tilewidth;
                  //   yy = this.six_firstgid.tileheight;
                }
                 else{
                    temp++;
                }
                
            }
            }
            
              this.tree_isoGroup.forEach(function (tile) {
        this.game.add.tween(tile).to({angle: -1}, 250).to({angle: 1}, 250).loop().start();
         }, this);
    }
    
    
   
}


export default BootState;

//  var halfWidth  = (canvas.width / 2)  / camera.zoom;
//   var halfHeight = (canvas.height / 2) / camera.zoom;
//   // clamping the camera within the bounds of the world
//   var clampedX = clamp(followObject.position.x, halfWidth, world.width - halfWidth);
//   var clampedY = clamp(followObject.position.y, halfHeight, world.height - halfHeight);
//   camera.x = (-clampedX * camera.zoom + canvas.width / 2);
//   camera.y = (-clampedY * camera.zoom + canvas.height / 2);

//   layer.scale.set(camera.zoom, camera.zoom);
//   layer.position.set(camera.x, camera.y);