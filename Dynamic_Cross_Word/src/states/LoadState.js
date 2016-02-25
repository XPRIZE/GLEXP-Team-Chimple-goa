class LoadState extends Phaser.State {
    
    preload() {
                    //Loading common assets for game 
                    this.game.load.image('1','assets/1.png');
			     	this.game.load.image('dot1','assets/dot1.png');
                    this.game.load.image('dot','assets/dot.png'); 
                    this.game.load.image('1dark','assets/1dark.png');
                    this.game.load.image('home','assets/home.png');
                    this.game.load.image('home1','assets/home1.png');
                    this.game.load.image('back','assets/back.png');
				    this.game.load.image('forw','assets/forw.png');

                    //Loading assets for fruit and vegetable
                    this.game.load.image('fruitBg','assets/fruit&veg/fruitBg.png');
                    this.game.load.image('panelFru','assets/fruit&veg/panelFru.png');
                    
      				this.game.load.image('banana','assets/fruit&veg/banana.png');
					this.game.load.image('peach','assets/fruit&veg/peach.png');	
                    this.game.load.image('spinach','assets/fruit&veg/spinach.png');
                    this.game.load.image('lemon','assets/fruit&veg/lemon.png');	
                    this.game.load.image('mango','assets/fruit&veg/mango.png');	
                    this.game.load.image('potato','assets/fruit&veg/potato.png');	
                    this.game.load.image('radish','assets/fruit&veg/radish.png');
                    this.game.load.image('orange','assets/fruit&veg/orange.png');
                    this.game.load.image('peas','assets/fruit&veg/peas.png');	
                    this.game.load.image('apple','assets/apple.png');
                    this.game.load.image('grapes','assets/grapes.png');
                    this.game.load.image('papaya','assets/papaya.png');
                    
                   
                    //Loading assets of  Reptiles
                    this.game.load.image('panelRep','assets/rep&am/panelRep.png');
                    this.game.load.image('repBg','assets/rep&am/repBg.png');
                    
                    this.game.load.image('ant','assets/rep&am/ant.png');
                    this.game.load.image('beetle','assets/rep&am/beetle.png');
                    this.game.load.image('butterfly','assets/rep&am/butterfly.png');
                    this.game.load.image('cockroach','assets/rep&am/cockroach.png');
                    this.game.load.image('crab','assets/rep&am/crab.png');
                    this.game.load.image('dragonfly','assets/rep&am/dragonfly.png');
                    this.game.load.image('fly','assets/rep&am/fly.png');
                    this.game.load.image('frog','assets/rep&am/frog.png');
                    this.game.load.image('scorpion','assets/rep&am/scorpion.png');
                    this.game.load.image('shark','assets/rep&am/shark.png');
                    this.game.load.image('spider','assets/rep&am/spider.png');
                    this.game.load.image('squid','assets/rep&am/squid.png');
                   
                    //Loading assets of BIRD
                   this.game.load.image('birdBg','assets/birds/birdBg.png');
                   this.game.load.image('panelBird','assets/birds/panelBird.png');
                    
                   this.game.load.image('crane','assets/birds/crane.png');
                   this.game.load.image('crow','assets/birds/crow.png');
                   this.game.load.image('dove','assets/birds/dove.png');
                   this.game.load.image('duck','assets/birds/duck.png');
                   this.game.load.image('eagle','assets/birds/eagle.png');
                   this.game.load.image('falcon','assets/birds/falcon.png');
                   this.game.load.image('flamingo','assets/birds/flamingo.png');
                   this.game.load.image('ostrich','assets/birds/ostrich.png');
                   this.game.load.image('parrot','assets/birds/parrot.png');
                   this.game.load.image('penguin','assets/birds/penguin.png');
                   this.game.load.image('sparrow','assets/birds/sparrow.png');
                   this.game.load.image('owl','assets/birds/owl.png');
                   
                   
                   //Loading assets of MAMMAL
                   this.game.load.image('panelMam','assets/mammal/panelMam.png'); 
                   this.game.load.image('mammalBg','assets/mammal/mammalBg.png'); 
                   
                  this.game.load.image('bear','assets/mammal/bear.png');
                  this.game.load.image('camel','assets/mammal/camel.png');
                  this.game.load.image('elephant','assets/mammal/elephant.png');
                  this.game.load.image('dolphin','assets/mammal/dolphin.png');
                  this.game.load.image('gorilla','assets/mammal/gorilla.png');
                  this.game.load.image('kangaroo','assets/mammal/kangaroo.png');
                  this.game.load.image('lion','assets/mammal/lion.png');
                  this.game.load.image('tiger','assets/mammal/tiger.png');
                  this.game.load.image('whale','assets/mammal/whale.png');
                  this.game.load.image('wolf','assets/mammal/wolf.png');
                  this.game.load.image('yak','assets/mammal/yak.png');
                  this.game.load.image('zebra','assets/mammal/zebra.png');
                  
                  
                  //Loading assets of DIGITAL
                this.game.load.image('digitalBg','assets/digital/digitalBg.png');
                this.game.load.image('panelDigi','assets/digital/panelDigi.png');
                  
                this.game.load.image('keyboard','assets/digital/keyboard.png');
                this.game.load.image('camera','assets/digital/camera.png');
                this.game.load.image('mouse','assets/digital/mouse.png');
                this.game.load.image('copier','assets/digital/copier.png');
                this.game.load.image('cpu','assets/digital/cpu.png');
                this.game.load.image('cellphone','assets/digital/cellphone.png');
                this.game.load.image('floppy','assets/digital/floppy.png');
                this.game.load.image('printer','assets/digital/printer.png');
                this.game.load.image('harddisk','assets/digital/harddisk.png');
                this.game.load.image('moniter','assets/digital/moniter.png');
                this.game.load.image('pendrive','assets/digital/pendrive.png');
                this.game.load.image('tablet','assets/digital/tablet.png');
                
                
                //Loading assets of LAB
	            this.game.load.image('labBg','assets/lab/labBg.png');
                this.game.load.image('panelLab','assets/lab/panelLab.png');
               
                this.game.load.image('ammeter','assets/lab/ammeter.png');
                this.game.load.image('beaker','assets/lab/beaker.png');
                this.game.load.image('burner','assets/lab/burner.png');
                this.game.load.image('flask','assets/lab/flask.png');
                this.game.load.image('funnel','assets/lab/funnel.png');
                this.game.load.image('corks','assets/lab/corks.png');
                this.game.load.image('lens','assets/lab/lens.png');
                this.game.load.image('magnet','assets/lab/magnet.png');
                this.game.load.image('prism','assets/lab/prism.png');
                this.game.load.image('spatula','assets/lab/spatula.png');
                this.game.load.image('testtube','assets/lab/testtube.png');
                this.game.load.image('tripod','assets/lab/tripod.png');
                
                
                //Loading assets of GEOMETRY
                this.game.load.image('panelGeo','assets/geo/panelGeo.png');
                this.game.load.image('geoBg','assets/geo/geoBg.png');
                
                this.game.load.image('circle','assets/geo/circle.png');
                this.game.load.image('cone','assets/geo/cone.png');
                this.game.load.image('rectangle','assets/geo/rectangle.png');
                this.game.load.image('pyramid','assets/geo/pyramid.png');
                this.game.load.image('prism','assets/geo/prism.png');
                this.game.load.image('drafter','assets/geo/drafter.png');
                this.game.load.image('triangle','assets/geo/triangle.png');
                this.game.load.image('pyramid','assets/geo/pyramid.png');
                this.game.load.image('star','assets/geo/star.png');
                this.game.load.image('cylinder','assets/geo/cylinder.png');
                this.game.load.image('compass','assets/geo/compass.png');
                this.game.load.image('geoBg','assets/geo/geoBg.png');
                this.game.load.image('hexagon','assets/geo/hexagon.png');
                this.game.load.image('cube','assets/geo/cube.png');

                   
                //Loading assets of  AUTOMOBILE
                this.game.load.image('panelAuto','assets/automobile/panelAuto.png');
                this.game.load.image('autoBg','assets/automobile/autoBg.png');
                
                this.game.load.image('car','assets/automobile/car.png');
                this.game.load.image('cycle','assets/automobile/cycle.png');
                this.game.load.image('plane','assets/automobile/plane.png');
                this.game.load.image('jet','assets/automobile/jet.png');
                this.game.load.image('ship','assets/automobile/ship.png');
                this.game.load.image('car','assets/automobile/car.png');
                this.game.load.image('tractor','assets/automobile/tractor.png');
                this.game.load.image('truck','assets/automobile/truck.png');
                this.game.load.image('train','assets/automobile/train.png');
                this.game.load.image('yatch','assets/automobile/yatch.png');
                this.game.load.image('rocket','assets/automobile/rocket.png');
                this.game.load.image('rickshaw','assets/automobile/rickshaw.png');             
                this.game.load.image('submarine','assets/automobile/submarine.png');
                     
                     
               //LOading assets of FLOWER n FRUITS
               this.game.load.image('flowerBg','assets/flower/flowerBg.png');   
               this.game.load.image('panel1','assets/ansPanel1.png');
               
               this.game.load.image('bamboo','assets/flower/bamboo.png');
               this.game.load.image('banyan','assets/flower/banyan.png');
               this.game.load.image('dahlia','assets/flower/dahlia.png');
               this.game.load.image('daisy','assets/flower/daisy.png');
               this.game.load.image('lily','assets/flower/lily.png');
               this.game.load.image('lotus','assets/flower/lotus.png');
               this.game.load.image('marigold','assets/flower/marigold.png');
               this.game.load.image('oak','assets/flower/oak.png');
               this.game.load.image('palm','assets/flower/palm.png');
               this.game.load.image('rose','assets/flower/rose.png');
               this.game.load.image('tulip','assets/flower/tulip.png');
               this.game.load.image('flowerBg','assets/flower/flowerBg.png');
               this.game.load.image('pine','assets/flower/pine.png');
                  
                      	this.game.load.image('gamebg', 'assets/gameBg1.jpg');
					 	this.game.load.image('wheel', 'assets/wheel.png');

               }

	create() {
                            this.game.state.start('MenuState');
	          }

}

export default LoadState;
