import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {


	preload(){   }

    create() {
                               
                                // adding and adjusting BG, HomeButTon, Grid Structure, Panel
                                  this.endCounter = 0;
                                  this.currentLevel = 0;
                                
                                  this.levelStage = {
                                                        level1 : 0,
                                                        level2 : 1,
                                                        level3 : 2,
                                                        level4 : 3,
                                                        level5 : 4,
                                                        level6 : 5,
                                                        level7 : 6,
                                                        level8 : 7,
                                                        level9 : 8
                                                      }
                                  this.initializeAll();// Initialize all global variable and array
                                  this.Level1();

								/*let	back = this.game.add.image(this.game.world.centerX-520,this.game.world.centerY+330,'back');
									back.anchor.setTo(.5,.5);
									back.scale.setTo(.8,.8);
									back.alpha =.1;
									back.inputEnabled = true;


							     	let	forward = this.game.add.image(this.game.world.centerX+520,this.game.world.centerY+330,'forw');
									forward.anchor.setTo(.5,.5);
									forward.scale.setTo(.8,.8);
									forward.alpha =.1;
									forward.inputEnabled = true;  */
               }

          initializeAll(){    // ARRAY and VARIBLE declaration
                             this.squarePos = new Array();
                             this.selectFru =new Array();
                             this.contentArray = new Array();
                             this.killArray = new Array();
                             this.contentPart = new Array();
                             this.disappear = new Array();
                             this.contentMain = new Array();
                             this.textPos = new Array();
                             this.pankaj10 = new Array();
                             this.mArray = new Array();
                             this.checkIndexArr = new Array();
                             this.unmatchArr = new Array();
                             this.lengthStore = new Array();
                             this.selectFru = new Array();
                             this.optionArray = new Array();
                             this.panIdOrg = new Array();
                             this.ansName = new Array();
                             this.panId = new Array();
                             this.baseFade = new Array();
                             this.gridArray = new Array();
                             this.textArray = new Array();
                             this.propStore = new Array();
                             this.imageStore = new Array();
                             
                             this.horizontal = true;
                             this.chkInd =0;
                             this.addStructureCount =0;
                             this.flag=0
                             this.posIndex = 41;
                             this.startIndex = 41;

                             this.c =0
                             this.transImgId =0;
                             this.counter =0;

                             this.colorCode = [0xe60000,0xffd200,0x2da8f6,0x5fea3a,0x7825c1];
                             this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                             this.click = [false, false, false, false,false];
                             this.lengthCheck;
                             this.textOver;

                            this.textOverans = this.game.add.group();
                            this.grid = this.game.add.group();
                            this.grid.enableBody =true;
                           
					    	this.game.physics.arcade.enable(this.grid)
                            this.option = this.game.add.group();
                            this.squareAns = this.game.add.group();
                            this.option = this.game.add.group();

                            this.Name = " " ;
                         }
          Level1(){
                         this.bg = this.game.add.image(0,0,'fruitBg');
					     this.bg.alpha= .8;

                         this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelFru');
                         this.initializeAll();

                           // ARRAY element having name of object
                     this.contentArray =[{name:['A','P','P','L','E'],len:5, nameStr: 'apple', img:'apple'},
                                        {name:['O','R','A','N','G','E'],len:6, nameStr: 'orange', img:'orange'},                                       
                                        {name:['M','A','N','G','O'],len:5, nameStr: 'mango', img:'mango'},
                                        {name:['P','E','A','S'],len:4, nameStr:'peas', img:'peas'},
                                        {name:['L','E','M','O','N'],len:5, nameStr: 'lemon', img:'lemon'},
                                        {name:['P','E','A','C','H'],len:5, nameStr: 'peach', img:'peach'},
                                        {name:['C','O','C','O', 'N','U','T'],len:7, nameStr: 'coconut', img:'coconut'},
                                        {name:['G','R','A','P', 'E','S'],len:6, nameStr: 'grapes', img:'grapes'},
                                        {name:['P','A','P','A', 'Y','A'],len:6, nameStr: 'papaya', img:'papaya'},
                                        {name:['B','A','N','A', 'N','A'],len:6, nameStr: 'banana', img:'banana'} ,
                                        {name:['S','P','I','N', 'A','C','H'],len:7, nameStr: 'spinach', img:'spinach'} ,
                                        {name:['P','O','T','A', 'T','O'],len:6, nameStr: 'potato', img:'potato'},
                                        {name:['R','A','D','I', 'S','H'],len:6, nameStr: 'radish', img:'radish'}
                                        
                                        ];
                                         console.log(this.contentArray);
                                         this.worldMaping();
                  }

           Level2(){

                         this.bg = this.game.add.image(0,0,'repBg');
					     this.bg.alpha= .8;

                         this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelRep');
                         this.initializeAll();

                     this.contentArray =[{name:['A','N','T'],len:3, nameStr: 'ant', img:'ant'},
                                        {name:['B','E','E','T','L','E'],len:6, nameStr: 'beetle', img:'beetle'},
                                        {name:['B','U','T','T','E','R','F','L','Y'],len:9, nameStr:'butterfly', img:'butterfly'},
                                        {name:['C','O','C','K','R','O','A','C','H'],len:9, nameStr: 'cockroach', img:'cockroach'},
                                        {name:['C','R','A','B'],len:4, nameStr:'crab', img:'crab'},
                                        {name:['S','H','A','R','K'],len:5, nameStr: 'shark', img:'shark'},
                                        {name:['D','R','A','G','O','N','F','L','Y'],len:9, nameStr: 'dragonfly', img:'dragonfly'},
                                        {name:['F','R','O','G'],len:4, nameStr: 'frog', img:'frog'},
                                        {name:['S','C','O','R','P','I','O','N'],len:8, nameStr: 'scorpion', img:'scorpion'},
                                        {name:['S','P','I','D','E','R'],len:6, nameStr: 'spider', img:'spider'},
                                        {name:['S','Q','U','I','D'],len:5, nameStr: 'squid', img:'squid'} ,
                                        {name:['F','L','Y'],len:3, nameStr: 'fly', img:'fly'} ,
                                       ];  

                                          console.log(this.contentArray);
                                          this.worldMaping();

                }
             Level3(){
                         this.bg = this.game.add.image(0,0,'birdBg');
					     this.bg.alpha= .8;

                         this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelBird');
                         this.initializeAll();

                      this.contentArray =[{name:['C','R','A','N','E'],len:5, nameStr: 'crane', img:'crane'},
                                        {name:['C','R','O','W'],len:4, nameStr: 'crow', img:'crow'},
                                        {name:['D','O','V','E'],len:4, nameStr:'dove', img:'crow'},
                                        {name:['D','U','C','K'],len:4, nameStr: 'duck', img:'duck'},
                                        {name:['E','A','G','L','E'],len:5, nameStr:'eagle', img:'eagle'},
                                        {name:['F','A','L','C','O','N'],len:6, nameStr: 'falcon', img:'falcon'},
                                        {name:['F','L','A','M','I','N','G','O'],len:8, nameStr: 'flamingo', img:'flamingo'},
                                        {name:['O','S','T','R', 'I','C','H'],len:7, nameStr: 'ostrich', img:'ostrich'},
                                        {name:['P','A','R','R', 'O','T'],len:6, nameStr: 'parrot', img:'parrot'},
                                        {name:['P','E','N','G', 'U','I','N'],len:7, nameStr: 'penguin', img:'penguin'},
                                        {name:['S','P','A','R', 'R','O','W'],len:7, nameStr: 'sparrow', img:'sparrow'} ,
                                        {name:['O','W','L'],len:3, nameStr: 'owl', img:'owl'}
                                       ];

                                        console.log(this.contentArray);
                                        this.worldMaping();

           }
           
           Level4(){
                         this.bg = this.game.add.image(0,0,'mammalBg');
					     this.bg.alpha= .8;

                         this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelMam');
                         this.initializeAll();
               
                     this.contentArray =[{name:['B','E','A','R'],len:4, nameStr: 'bear', img:'bear'},
                                        {name:['C','A','M','E', 'L'],len:5, nameStr: 'camel', img:'camel'},
                                        {name:['E','L','E','P','H','A','N','T'],len:8, nameStr:'elephant', img:'elephant'},
                                        {name:['D','O','L','P','H','I','N'],len:7, nameStr: 'dolphin', img:'dolphin'},
                                        {name:['G','O','R','I','L','L','A'],len:7, nameStr:'gorilla', img:'gorilla'},
                                        {name:['K','A','N','G','A','R','O','O'],len:8, nameStr: 'kangaroo', img:'kangaroo'},
                                        {name:['L','I','O','N'],len:4, nameStr: 'lion', img:'lion'},
                                        {name:['T','I','G','E', 'R'],len:5, nameStr: 'tiger', img:'tiger'},
                                        {name:['W','H','A','L', 'E'],len:5, nameStr: 'whale', img:'whale'},
                                        {name:['W','O','L','F'],len:4, nameStr: 'wolf', img:'wolf'},
                                        {name:['Y','A','K'],len:3, nameStr: 'yak', img:'yak'} ,
                                        {name:['Z','E','B','R','A'],len:5, nameStr: 'zebra', img:'zebra'}
                                        ];

                                        console.log(this.contentArray);
                                        this.worldMaping();
               
                  }
                  
            Level5(){
                         this.bg = this.game.add.image(0,0,'labBg');
					     this.bg.alpha= .8;

                         this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelLab');
                         this.initializeAll();
               
                     this.contentArray =[{name:['B','E','A','K','E','R'],len:6, nameStr: 'beaker', img:'beaker'},
                                        {name:['A','M','M','E', 'T','E','R'],len:7, nameStr: 'ammeter', img:'ammeter'},
                                        {name:['B','U','R','N','E','R'],len:6, nameStr:'burner', img:'burner'},
                                        {name:['F','L','A','S','K'],len:5, nameStr: 'flask', img:'flask'},
                                        {name:['F','U','N','N','E','L'],len:6, nameStr:'funnel', img:'funnel'},
                                        {name:['C','O','R','K','S'],len:5, nameStr: 'corks', img:'corks'},
                                        {name:['L','E','N','S'],len:4, nameStr: 'lens', img:'lens'},
                                        {name:['M','A','G','N', 'E','T'],len:6, nameStr: 'magnet', img:'magnet'},
                                        {name:['P','R','I','S', 'M'],len:5, nameStr: 'prism', img:'prism'},
                                        {name:['S','P','A','T','U','L','A'],len:7, nameStr: 'spatula', img:'spatula'},
                                        {name:['T','R','I','P','O','D'],len:6, nameStr: 'tripod', img:'tripod'} ,
                                        {name:['T','E','S','T','T','U','B','E'],len:8, nameStr: 'testtube', img:'testtube'}
                                        ];

                                        console.log(this.contentArray);
                                        this.worldMaping();
               
                  }
                  
            Level6(){
                    this.bg = this.game.add.image(0,0,'digitalBg');
                    this.bg.alpha= .8;

                    this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelDigi');
                    this.initializeAll();
        
                     this.contentArray =[{name:['K','E','Y','B','O','A','R','D'],len:8, nameStr: 'keyboard', img:'keyboard'},
                                        {name:['C','A','M','E', 'R','A'],len:6, nameStr: 'camera', img:'camera'},
                                        {name:['M','O','U','S','E'],len:5, nameStr:'mouse', img:'mouse'},
                                        {name:['C','O','P','I','E','R'],len:6, nameStr: 'copier', img:'copier'},
                                        {name:['C','P','U'],len:3, nameStr:'cpu', img:'cpu'},
                                        {name:['C','E','L','L','P','H','O','N','E'],len:9, nameStr: 'cellphone', img:'cellphone'},
                                        {name:['F','L','O','P','P','Y'],len:6, nameStr: 'floppy', img:'floppy'},
                                        {name:['P','R','I','N', 'T','E','R'],len:7, nameStr: 'printer', img:'printer'},
                                        {name:['H','A','R','D', 'D','I','S','K'],len:8, nameStr: 'harddisk', img:'harddisk'},
                                        {name:['M','O','N','I','T','E','R'],len:7, nameStr: 'moniter', img:'moniter'},
                                        {name:['P','E','N','D','R','I','V','E'],len:8, nameStr: 'pendrive', img:'pendrive'} ,
                                        {name:['T','A','B','L','E','T'],len:6, nameStr: 'tablet', img:'tablet'}
                                        ];

                                console.log(this.contentArray);
                                this.worldMaping();
        
            }
            
            Level7(){
                    this.bg = this.game.add.image(0,0,'geoBg');
                    this.bg.alpha= .8;

                    this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelGeo');
                    this.initializeAll();
        
                     this.contentArray =[{name:['T','R','I','A','N','G','L','E'],len:8, nameStr: 'triangle', img:'triangle'},
                                        {name:['C','I','R','C', 'L','E'],len:6, nameStr: 'circle', img:'circle'},
                                        {name:['C','O','N','E'],len:4, nameStr:'cone', img:'cone'},
                                        {name:['R','E','C','T','A','N','G','L','E'],len:9, nameStr: 'rectangle', img:'rectangle'},
                                        {name:['P','Y','R','A','M','I','D'],len:7, nameStr:'pyramid', img:'pyramid'},
                                        {name:['S','T','A','R'],len:4, nameStr: 'star', img:'star'},
                                        {name:['C','Y','L','I','N','D','E','R'],len:8, nameStr: 'cylinder', img:'cylinder'},
                                        {name:['C','O','M','P', 'A','S','S'],len:7, nameStr: 'compass', img:'compass'},
                                        {name:['H','E','X','A', 'G','O','N'],len:7, nameStr: 'hexagon', img:'hexagon'},
                                        {name:['C','U','B','E'],len:4, nameStr: 'cube', img:'cube'},
                                        {name:['P','R','I','S','M'],len:5, nameStr: 'prism', img:'prism'} ,
                                        {name:['D','R','A','F','T','E','R'],len:7, nameStr: 'drafter', img:'drafter'}
                                        ];

                                console.log(this.contentArray);
                                this.worldMaping();
        
            }
            
              Level8(){
                    this.bg = this.game.add.image(0,0,'autoBg');
                    this.bg.alpha= .8;

                    this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panelAuto');
                    this.initializeAll();
        
                     this.contentArray =[{name:['S','U','B','M','A','R','I','N','E'],len:9, nameStr: 'submarine', img:'submarine'},
                                        {name:['C','Y','C','L','E'],len:5, nameStr: 'cycle', img:'cycle'},
                                        {name:['C','A','R'],len:3, nameStr:'car', img:'car'},
                                        {name:['P','L','A','N','E'],len:5, nameStr: 'plane', img:'plane'},
                                        {name:['J','E','T'],len:3, nameStr:'jet', img:'jet'},
                                        {name:['S','H','I','P'],len:4, nameStr: 'ship', img:'ship'},
                                        {name:['T','R','A','C','T','O','R'],len:7, nameStr: 'tractor', img:'tractor'},
                                        {name:['T','R','U','C', 'K'],len:5, nameStr: 'truck', img:'truck'},
                                        {name:['T','R','A','I', 'N'],len:5, nameStr: 'train', img:'train'},
                                        {name:['Y','A','T','C','H'],len:5, nameStr: 'yatch', img:'yatch'},
                                        {name:['R','O','C','K','E','T'],len:6, nameStr: 'rocket', img:'rocket'} ,
                                        {name:['R','I','C','K','S','H','A','W'],len:8, nameStr: 'rickshaw', img:'rickshaw'}
                                        ];

                                console.log(this.contentArray);
                                this.worldMaping();
        
            }
            
            
              Level9(){
                    this.bg = this.game.add.image(0,0,'flowerBg');
                    this.bg.alpha= .8;

                    this.panel = this.game.add.image(0,this.game.world.centerY+230, 'panel1');
                    this.initializeAll();
        
                     this.contentArray =[{name:['B','A','M','B','O','O'],len:6, nameStr: 'bamboo', img:'bamboo'},
                                        {name:['B','A','N','Y','A','N'],len:6, nameStr: 'banyan', img:'banyan'},
                                        {name:['D','A','H','L','I','A'],len:6, nameStr:'dahlia', img:'dahlia'},
                                        {name:['D','A','I','S','Y'],len:5, nameStr: 'daisy', img:'daisy'},
                                        {name:['L','I','L','Y'],len:4, nameStr:'lily', img:'lily'},
                                        {name:['L','O','T','U','S'],len:5, nameStr: 'lotus', img:'lotus'},
                                        {name:['M','A','R','I','G','O','L','D'],len:8, nameStr: 'marigold', img:'marigold'},
                                        {name:['O','A','K'],len:3, nameStr: 'oak', img:'oak'},
                                        {name:['P','A','L','M'],len:4, nameStr: 'palm', img:'palm'},
                                        {name:['R','O','S','E'],len:4, nameStr: 'rose', img:'rose'},
                                        {name:['T','U','L','I','P'],len:5, nameStr: 'tulip', img:'tulip'} ,
                                        {name:['P','I','N','E'],len:4, nameStr: 'pine', img:'pine'}
                                        ];

                                console.log(this.contentArray);
                                this.worldMaping();
        
            }

          worldMaping(){

                                    this.home1 = this.game.add.image(this.game.world.centerX-575,this.game.world.centerY-340,'home1');
									this.home1.anchor.setTo(.5,.5);
									this.home1.scale.setTo(.6,.6);
									this.game._home = this.game.add.image(this.game.world.centerX-575,this.game.world.centerY-347,'home');
									this.game._home.anchor.setTo(.5,.5);
									this.game._home.scale.setTo(.6,.6);
									this.game._home.inputEnabled = true;

                                    let posX =this.game.world.centerX-280;
								    let posY= this.game.world.centerY-365;
                      	 			let addX= 0;
			     					let addY = 0;
									let img1Id =0;

                                      // adding grid structure to game

                                     for(let i=1; i<11; i++)
								    {

								     for(let j=1; j<11; j++)
									{
                                            let realX = posX+addX;
                                            let realY = posY+addY;

											let img1 = this.game.add.sprite(realX,realY,'1');
											img1.anchor.setTo(.5,.5);
											img1.scale.setTo(.9,.9);
											img1.id =img1Id+1;
											img1.alpha = 1;
											img1Id++;
                                            this.gridArray.push(img1);


									        this.squarePos.push({X:img1.position.x, Y:img1.position.y, id:img1.id});

											addX= addX+60.66;

											this.game._c = this.game._c + 1;
									}
										    addY= addY+60.66;

											addX= 0;
									}
                              
                                  // calling structure for building structure
                                    this.structure();



                       }

          structure() {
                             let k =0;
                             let r;
                             let text;
                             
                             
                             
                 /*    this.contentArray =[
                                        {name:['B','U','T','T','E','R','F','L','Y'],len:9, nameStr:'butterfly', img:'butterfly'},
                                       
                                        {name:['C','R','A','B'],len:4, nameStr:'crab', img:'crab'},
                                        {name:['S','H','A','R','K'],len:5, nameStr: 'shark', img:'shark'},
                                     
                                        {name:['S','C','O','R','P','I','O','N'],len:8, nameStr: 'scorpion', img:'scorpion'},
                                       
                                        {name:['S','Q','U','I','D'],len:5, nameStr: 'squid', img:'squid'} ,
                                      
                                       ];*/

                         // Logic for Random Generation of 4 element
                              for(let i=0; i<5; i++)
                        {
                            // Randomization , push and splice of element
                                let m = this.game.rnd.integerInRange(0, this.contentArray.length-1 );
                                this.contentPart.push(this.contentArray[m]);
                                this.selectFru.push(this.contentArray[m]);
                                this.contentArray.splice(m, 1);

                        }
                              console.log(this.selectFru);
                              console.log(this.contentPart);
                              this.max = this.contentPart[0].len;
                              var len1= this.contentPart.length-1;

                               while(len1>=0)
                            {
                                    if(this.contentPart[len1].len > this.max)
                                            {
                                                k = len1;
                                                this.max = this.contentPart[k].len;  // Getting length of max length element and index
                                            }

                                   len1--;

                            }
                               //   laying down the first element

                                 let c1=0;
                                 let c12 = 0;

                                 this.checkIndex= Math.floor(this.startIndex/10); // Index of, out of the grid checking number
                                 this.checkIndexArr.push({checkIndex :this.checkIndex, startIndex: this.startIndex}); // Array used to store check index and  start index
                                 let m = this.game.rnd.integerInRange(0, this.colorCode.length-1);
                                 let countElement = 0;
                                 let t=0;
                                   for(let i=0; i<this.max; i++)
                                {
                                    if(this.max <= 9)
                                    {
                                            let textXprop1 = this.squarePos[41+c1].X;
                                            let textYprop1 = this.squarePos[41+c1].Y;


                                            if(t==0)
                                            {
                      
                                                this.prop = this.game.add.image(this.squarePos[40].X, this.squarePos[40].Y, this.contentPart[k].img);
                                                this.prop.anchor.setTo(.5);
                                                this.prop.scale.setTo(.45);
                                                this.propStore.push(this.prop);
                                              
                                                this.zeroAlpha = this.game.add.image(this.squarePos[40].X, this.squarePos[40].Y,'1');
                                                this.zeroAlpha.alpha=.01;
                                                this.zeroAlpha.anchor.setTo(.5);
                                                this.zeroAlpha.id = this.transImgId;
                                                this.zeroAlpha.inputEnabled = true;  
                                                this.transImgId++;
                                                this.zeroAlpha.events.onInputDown.add(this.propEffect, this);
                                               this.imageStore.push({X:this.squarePos[40].X,Y:this.squarePos[40].Y});                                          
                                           
                                                t++;
                                            }
                                            // Add color square box to the grid
                                            this.colorBox(textXprop1,textYprop1,m);

                                            // Add text to the respective color square box
                                            text= this.game.add.text(textXprop1, textYprop1, this.contentPart[k].name[i],{font:'32px Oswald', fill: "#ffffff"});
                                            text.anchor.setTo(.5,.5);
                                            this.textPos.push({X:textXprop1,Y:textYprop1, char: this.contentPart[k].name[i], color:this.colorCode[m]});
                                            countElement++;
                                            c1 = c1+1;
                                            c12 = c12+10;

                                    }


                                }
                                this.lengthStore.push(countElement);
                                this.colorCode.splice(m,1);
                                console.log('color code : '+ this.colorCode);
                                // Put first element to the new array called maxFru
                                            this.contentMain.push(this.contentPart[k]);
                                            this.contentPart.splice(k,1);
                                            console.log(this.contentMain);
                                            console.log(this.contentPart);
                                            this.strucVertical();
                                            this.disappearAlpha();
                                            
                                         
          }

       strucVertical(){
                                // Initialisation of the local variable

                                    let c1=0;
                                    let c12=0;
                                    let text;
                                    let flag = 0;
                                    let z=0;
                                    let t=0;
                                 //   this.lengthCheck;
                                    let maxima = this.contentMain[z].len;

               for(let i=0; i <this.contentMain[z].len; i++)   // For loop for check taking 1st element letter
               {
                   for(let j=0; j<this.contentPart[this.c].len;j++)  // For loop used for new elemet letter
                   {

                    //  if(this.contentMain[0].name[i]==this.contentPart[this.c].name[j] )

                       if(this.contentMain[0].name[i]==this.contentPart[this.c].name[j]) // Condition for checking crosssection element, same or not
                       {
                                       let impVar =(this.posIndex+i)-(10*j)+c12
                                       let lastposIndex = impVar+(this.contentPart[this.c].len-1)*10;
                                       let extreamIndex = Math.floor(lastposIndex/10)
                                           console.log('lastposIndex='+lastposIndex);

                              if(j<=this.checkIndexArr[this.chkInd].checkIndex && extreamIndex <= 9) // Condition for checking element laying inside the grid or not

                                        {

                                            // Laying out suitable element over grid
                                              let m = this.game.rnd.integerInRange(0, this.colorCode.length-1 );
                                               let  countElement =0;
                                              for(let l=0; l<this.contentPart[this.c].len;l++)
                                            {


                                                            let textXprop2 = this.squarePos[(this.posIndex+i)-(10*j)+c12].X;
                                                            let textYprop2 = this.squarePos[(this.posIndex+i)-(10*j)+c12].Y;

                                                            if(t==0)
                                                              {
                                                                  //
                                                                        let imgIndex = (this.posIndex+i)-(10*j)
                                                                        if(Math.floor(imgIndex/10) !=0)
                                                                        {
                                                                          this.prop = this.game.add.image(this.squarePos[imgIndex-10].X, this.squarePos[imgIndex-10].Y, this.contentPart[this.c].img);
                                                                          this.zeroAlpha = this.game.add.image(this.squarePos[imgIndex-10].X, this.squarePos[imgIndex-10].Y,'1');
                                                                          this.imageStore.push({X:this.squarePos[imgIndex-10].X,Y:this.squarePos[imgIndex-10].Y});
                                                                        }
                                                                       else{
                                                                          this.prop = this.game.add.image(this.squarePos[imgIndex+1].X, this.squarePos[imgIndex+1].Y, this.contentPart[this.c].img);
                                                                          this.zeroAlpha = this.game.add.image(this.squarePos[imgIndex+1].X, this.squarePos[imgIndex+1].Y,'1'); 
                                                                          this.imageStore.push({X:this.squarePos[imgIndex+1].X,Y:this.squarePos[imgIndex+1].Y}); 
                                                                         }
                                                                           
                                                                            this.prop.anchor.setTo(.5);
                                                                            this.prop.scale.setTo(.45);
                                                                            this.propStore.push(this.prop);
                                                                          
                                              
                                                                    this.zeroAlpha.alpha=.01;
                                                                    this.zeroAlpha.anchor.setTo(.5);
                                                                    this.zeroAlpha.id = this.transImgId;
                                                                    this.zeroAlpha.inputEnabled = true;  
                                                                    this.transImgId++;
                                                                    this.zeroAlpha.events.onInputDown.add(this.propEffect, this);
                                                                                                                             
                                                                  
                                                                 
                                                                    let X =1;
                                                                    this.startIndex = (this.posIndex+i)-(10*j)+c12;  //Calculating start index
                                                                    console.log('start index :'+this.startIndex);
                                                                    this.checkIndex= this.startIndex%10 ;  // Calculating  checkindex
                                                                    this.checkIndexArr.push({checkIndex :this.checkIndex, startIndex: this.startIndex});// Storing check and start index

                                                                    console.log(this.checkIndexArr);
                                                                    t++;
                                                                    X++;
                                                             }
                                             // Call color box method for coloring
                                             this.colorBox(textXprop2, textYprop2, m);

                                            text = this.game.add.text(textXprop2, textYprop2, this.contentPart[this.c].name[l],{font:'32px Oswald', fill: "#ffffff"});
                                            text.anchor.setTo(.5,.5);
                                            this.textPos.push({X:textXprop2,Y:textYprop2, char:this.contentPart[this.c].name[l], color:this.colorCode[m], reserve:false});

                                                    c1=c1+1;
                                                    c12=c12+10;
                                                  countElement++;
                                            }
                                            this.lengthStore.push(countElement);
                                            // Remove color which is used previously
                                            this.colorCode.splice(m,1);

                                                    c1=0;
                                                    c12=0;
                                                    this.counter++;
                                                    this.flag++;
                                                    flag = 1;

                            // After successfully adding element make certain pushing element into MaxFru array and splice the same element from Array
                                                //    this.contentMain[0].name[i]='0';
                                                //    this.contentPart[this.c].name[j]='0';
                                                let W= i-1;
                                                let X= i+1;
                                                let Y= j-1;
                                                let Z= j+1;

                                                 this.contentMain[0].name[i]='0';
                                                 if(W>=0)
                                                 {

                                                  this.contentMain[0].name[W]='0';

                                                 }
                                                 if(X<this.contentMain[0].len)
                                                 {

                                                   this.contentMain[0].name[X]='0';

                                                 }
                                                 this.contentPart[this.c].name[j]='0';
                                                 if(Y>=0)
                                                 {

                                                      this.contentPart[this.c].name[Y]='0';

                                                 }
                                                 if(Z<this.contentPart[this.c].len)
                                                 {

                                                     this.contentPart[this.c].name[Z]='0';

                                                 }

                                                    console.log('array '+this.contentPart[this.c].name);
                                                    this.contentMain.push(this.contentPart[this.c]);
                                                    this.contentPart.splice(0,1);

                            // Checking array length having diffrent element is zero or not
                                                    if(this.contentPart.length != 0)
                                                        {
                                                            this.addStructurCount++;
                                                            this.strucVertical();
                                                        }

                                        }
                            // Else part of condition which chkng element laying on grid or not
                                         else {
                                                     continue;
                                              }

                       }

                    // For terminating inner loop after successfully laying down of element
                           if(flag == 1)
                                        {

                                            break;
                                        }

                     // For terminating outer loop after successfully laying down of element
                          }
                           if(flag == 1)
                                        {
                                            break;
                                        }


                     let newMaxima = maxima-1;

                 // If not find the perfect match at crosssection point, removing elemet and calling structure method again
                     if(i == newMaxima && this.flag != 4)  //change
                         {

                                       this.unmatchArr.push(this.contentPart[this.c]);
                                       this.contentPart.splice(this.c, 1);

                                       if(this.contentPart.length != 0)
                                       {

                                           this.addStructureCount++

                                           this.strucVertical();

                                       }
                         }
               }


           // After checking overall first match method call another method for horizonal laying of remaining element
              if( (this.contentMain.length + this.unmatchArr.length-1) == 4) //change
                {
                    this.chkInd++;
                    this.newIndex =  this.chkInd++;
                    this.chkInd--;
                    this.lengthCheck =  this.unmatchArr.length;
                    this.contentMain.splice(0,1);

                   console.log(this.checkIndexArr);
                   if(this.contentMain.length != 4)//change
                   {
                         this.z = 0;
                         this.flag=0;
                         this.strucHorizontal();
                         console.log('Important array :');
                         console.log(this.textPos);
                   }


                }


	      }


           update() {

                           this.home1.angle+=.5;
                    }

          // Method to make a word fit in horizontal manner
          strucHorizontal(){
                                                    // Initialisation of the local variable
                                                            let c1=0;
                                                            let c12=0;
                                                            let text;
                                                            let flag =0 ;
                                                            let t=0;
                                                            let extraFruit = new Array();
                                                            let maxFruextra = new Array();
                                                            let checkCounter=true;
                                                           
                                                            let maxima = this.contentMain[this.z].len;


               for(let i=0; i <this.contentMain[this.z].len; i++)  // For loop for check taking 1st element letter
               {
                                    if(this.unmatchArr.length == 0)
                                {
                                    break;
                                }

                   for(let j=0; j<this.unmatchArr[this.c].len;j++)   // For loop used for new elemet letter
                   {
                                if(this.unmatchArr.length == 0)
                                {
                                    break;
                                }
                       if(this.contentMain[this.z].name[i]==this.unmatchArr[this.c].name[j]) // Condition for checking crosssection element, same or not

                       {

                            if(j <= this.checkIndexArr[this.chkInd].checkIndex)  // Condition for checking element laying inside the grid or not
                                      {
                                        
                                           let impVar = (this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1
                                           let lastposIndex = impVar+(this.unmatchArr[this.c].len-1);

                                           let impVar10th = Math.floor(impVar/10);
                                           let lastposIndex10th = Math.floor(lastposIndex/10);

                                           let firstPosX = this.squarePos[impVar].X;
                                           let firstPosY = this.squarePos[impVar].Y;

                                     

                                           let lastPosX = this.squarePos[impVar+(this.unmatchArr[this.c].len-1)].X;
                                           let lastPosY = this.squarePos[impVar+(this.unmatchArr[this.c].len-1)].Y;

                                        


                                //           let textXprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].X;
                                  //         let textYprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].Y;
                                           
                                    
                                         //
                                          let setBool = true;
                                          for(let v=0; v < this.unmatchArr[this.c].len; v++) //outer loop for element which is ready
                                           {
                                               //Calculation diffrent position which is taking by the element on grid
                                                let textXprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].X;
                                                let textYprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].Y; 
                                         
                                                    for(let w=0; w < this.imageStore.length; w++)
                                                        {
                                                                if(textXprop2 == this.imageStore[w].X && textYprop2 == this.imageStore[w].Y)
                                                                {
                                                                    setBool = false;
                                                                }
                                                                if(!setBool)
                                                                {
                                                                    break;
                                                                }
                                                          
                                                        }
                                                         if(!setBool)
                                                          {
                                                              break;
                                                          }
                                                 c1=c1+1;
                                           }
                                       
                                                 c1=0;
                             if(impVar10th == lastposIndex10th && setBool)  //Check condition, if particular elemet taking one row or 2 row
                             {
                                          for(let v=0; v < this.unmatchArr[this.c].len; v++) //outer loop for element which is ready
                                           {
                                               //Calculation diffrent position which is taking by the element on grid
                                                let textXprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].X;
                                                let textYprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].Y;

                                        for(let w=0; w < this.textPos.length; w++)
                                            {
                                                    console.log('this.squarePos[0].Y ='+this.squarePos[0].Y);
                                                    console.log('this.squarePos[90].Y ='+this.squarePos[90].Y);
                                                    console.log('checkIndex ARR ='+this.checkIndexArr);
                                                    console.log('thiss.chkInd ='+this.chkInd);
                                                
                                   // Condition checking for position already occupied by other element or not
                                   if(
                                    (textXprop2 == this.textPos[w].X) && (textYprop2 ==  this.textPos[w].Y) && (firstPosX >= this.squarePos[0].X)
                                    && (firstPosX <= this.squarePos[9].X) && (lastPosX >= this.squarePos[0].X)
                                    && (lastPosX <= this.squarePos[9].X) && (firstPosY >= this.squarePos[0].Y)
                                    && (firstPosY <= this.squarePos[90].Y) && (lastPosY >= this.squarePos[0].Y)
                                    && (lastPosY <= this.squarePos[90].Y))
                                   {

                            // Condition for checking particular element having character same as the element already exist there
                            // also check if all the element present inside the grid
                                    if(this.unmatchArr[this.c].name[v]==this.textPos[w].char )
                                            {
                                                    checkCounter = true;
                                            }
                                        else{
                                                       checkCounter = false;

                                           }
                                    }

                              //  Condition for checking if element is inside the grid or not
                                    if((textXprop2 != this.textPos[w].X) && (textYprop2 !=  this.textPos[w].Y) && (firstPosX >= this.squarePos[0].X)
                                    && (firstPosX <= this.squarePos[9].X) && (lastPosX >= this.squarePos[0].X)
                                    && (lastPosX <= this.squarePos[9].X) && (firstPosY >= this.squarePos[0].Y)
                                    && (firstPosY <= this.squarePos[90].Y) && (lastPosY >= this.squarePos[0].Y)
                                    && (lastPosY <= this.squarePos[90].Y))
                                                {

                                                    checkCounter = true;
                                                }

                                            if(!checkCounter)
                                                            {
                                                                break;
                                                            }

                                         }
                                         c1=c1+1;
                                         if(!checkCounter)
                                         {
                                            // checkCounter = true;
                                             break;
                                         }
                                     }
                                     c1 =0;
                             }
                             else{

                                             checkCounter = false;
                                 }
                                     c1=0;
                                     // Condition check if element take one row or column
                                     if(checkCounter)
                                     {
                                         // Laying all element on the grid
                                          let m = this.game.rnd.integerInRange(0, this.colorCode.length-1);
                                          let countElement =0;
                                               for(let l=0; l<this.unmatchArr[this.c].len;l++)
                                            {
                                                let textXprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].X;
                                                let textYprop2 = this.squarePos[(this.checkIndexArr[this.chkInd].startIndex+i*10)-(j)+c1].Y;
                                                            if(t==0)
                                                              {
                                                                
                                                                   let imgActualIndex = (this.checkIndexArr[this.chkInd].startIndex+i*10)-j-1;
                                                                   let imgIndex = (this.checkIndexArr[this.chkInd].startIndex+i*10)-j;
                                                                   let imgActualIndex1 = (this.checkIndexArr[this.chkInd].startIndex+i*10)-j-10;
                                                                   let imgActualIndex2 = (this.checkIndexArr[this.chkInd].startIndex+i*10)-j+10;
                                
                                                                 if(imgIndex%10 !=0)
                                                                  {
                                                                          let decision = this.imageAdjust(imgActualIndex);
                                                                          if(!decision)
                                                                          {
                                                                            let againdecision =  this.imageAdjust(imgActualIndex1);
                                                                             if(!againdecision)
                                                                             {
                                                                                 this.imageAdjust(imgActualIndex2);
                                                                             }
                                                                          }
                                                                  }
                                                                  
                                                                  else{ 
                                                                          let decision = this.imageAdjust(imgActualIndex1);
                                                                          if(!decision)
                                                                          {
                                                                              this.imageAdjust(imgActualIndex2);
                                                                          }
                                                                      }
                                                                           
                                                                            this.prop.anchor.setTo(.5);
                                                                            this.prop.scale.setTo(.45);
                                                                            this.propStore.push(this.prop);
                                                                      
                                                                    this.zeroAlpha.alpha=.01;
                                                                    this.zeroAlpha.anchor.setTo(.5);
                                                                    this.zeroAlpha.id = this.transImgId;
                                                                    this.zeroAlpha.inputEnabled = true;  
                                                                    this.transImgId++;
                                                                    this.zeroAlpha.events.onInputDown.add(this.propEffect, this);
                                                                
                                                                    let X =1;
                                                                    this.startIndex = (this.posIndex+i*10)-(j)+c1;
                                                                    this.checkIndex= this.startIndex/10 ;
                                                                    this.checkIndexArr.push(this.checkIndex);
                                                                    t++;
                                                                    X++;
                                                              }
                                                             // Call color fill method for square
                                                              this.colorBox(textXprop2, textYprop2, m);

                                           // Add text to the respective color square grid
                                            text = this.game.add.text(textXprop2, textYprop2, this.unmatchArr[this.c].name[l],{font:'32px Oswald', fill: "#ffffff"});
                                            text.anchor.setTo(.5,.5);
                                            this.textPos.push({X:textXprop2,Y:textYprop2, char:this.unmatchArr[this.c].name[l], color:this.colorCode[m]});

                                                    c1=c1+1;
                                                    c12=c12+10;
                                                  countElement++;
                                            }
                                                // Remove color which is used previously
                                                this.colorCode.splice(m,1);
                                                this.lengthStore.push(countElement);
                                                    c1=0;
                                                    c12=0;
                                                    this.counter++;
                                                    this.flag++;
                                                    flag = 1;

                               // After successfully adding element make certain pushing element into MaxFru array and splice the same element from Array
                                                
                                                let W= i-1;
                                                let X= i+1;
                                                let Y= j-1;
                                                let Z= j+1;

                                                 this.contentMain[0].name[i]='0';
                                                 if(W>=0)
                                                 {
                                                  this.contentMain[0].name[W]='0';
                                                 }
                                                 if(X<this.contentMain[0].len)
                                                 {
                                                    this.contentMain[0].name[X]='0';
                                                 }
                                                this.unmatchArr[this.c].name[j]='0';
                                                 if(Y>=0)
                                                 {
                                                    this.unmatchArr[this.c].name[Y]='0';
                                                 }
                                                 if(Z < this.unmatchArr[this.c].len)
                                                 {
                                                    this.unmatchArr[this.c].name[Z]='0';
                                                 }

                                                    console.log('array ' +this.unmatchArr[this.c].name);
                                                    maxFruextra.push(this.unmatchArr[this.c]);
                                                    this.unmatchArr.splice(this.c,1);

                                // Checking array length having diffrent element is zero or not
                                                    if(this.unmatchArr.length != 0)
                                                        {
                                                            this.z = 0;

                                                            this.strucHorizontal();

                                                        }
                                                      if(this.unmatchArr.length == 0)
                                                        {
                                                            break;
                                                        }


                                          }
                                        }
                                         else {
                                                        continue;
                                              }

                                       }
                     // For terminating inner loop after successfully laying down of element
                            if(flag == 1)
                                            {

                                                break;
                                            }

                   }
                     // For terminating inner loop after successfully laying down of element
                           if(flag == 1)
                                            {
                                                break;
                                            }

                    let newMaxima = maxima-1;

               // If not find the perfect match at crosssection point, removing elemet and calling structure method again
                     if(i == newMaxima && this.flag != this.lengthCheck)
                         {
                           this.z++;

                           // check condition if maxfru array elemnet is complete or not. and initialise chkInd and Z again
                                  if(this.contentMain.length == this.z)
                                  {
                                        extraFruit.push(this.unmatchArr[this.c]);
                                        this.unmatchArr.splice(this.c,1);
                                        this.z=0;
                                        this.chkInd = this.newIndex;
                                        if(this.unmatchArr.length == 0)
                                                        {
                                                            break;
                                                        }
                                       if(this.unmatchArr.length !=0)
                                       {

                                        this.strucHorizontal();
                                      }

                                  }
                                  // Increment the value of CheckIndex for next array implementation
                                  else{
                                               this.chkInd++;
                                               if(this.unmatchArr.length == 0)
                                                            {
                                                                break;
                                                            }
                                               if(this.unmatchArr.length !=0)
                                                            {

                                                                this.strucHorizontal();

                                                            }

                                      }
                             }

                        }


            }
            
            imageAdjust(index){
                                      
                                       let alpha = true;
                                       let beta = true;
                        for(let s=0; s<this.imageStore.length; s++)
                        {
                            if(this.squarePos[index].X == this.imageStore[s].X && this.squarePos[index].Y == this.imageStore[s].Y )
                                        {
                                            alpha = false
                                        }
                                if(!alpha)
                                          {
                                              break;
                                          }
                        }
              
                    for(let s=0; s<this.textPos.length; s++)
                    {
                            if(this.squarePos[index].X == this.textPos[s].X && this.squarePos[index].Y == this.textPos[s].Y )
                                    {
                                            beta = false
                                    }
                              if(!beta)
                                    {
                                        break;
                                    }
                    }
         
                if(alpha && beta)
                        {   
                            
                        this.prop = this.game.add.image(this.squarePos[index].X, this.squarePos[index].Y, this.unmatchArr[this.c].img);
                        this.zeroAlpha = this.game.add.image(this.squarePos[index].X, this.squarePos[index].Y,'1');
                        this.imageStore.push({X:this.squarePos[index].X,Y:this.squarePos[index].Y});
                        return true;
                    }     
              
                else{
                        return false;
                    }          
                
            }
            
            //method forprop effect
            propEffect(sprite){ 
                                     if(sprite.id == 0)
                                {  
                                    //getting image variable and pass var, sprite id to the method
                                        let abc =this.propStore[sprite.id];  
                                        this.trueFalse(sprite.id, abc )    
                                  
                                }
                                
                                 if(sprite.id == 1)
                                {  
                                     //getting image variable and pass var, sprite id to the method
                                        let abc =this.propStore[sprite.id];  
                                        this.trueFalse(sprite.id, abc );   
                                    
                                }
                                 
                                 if(sprite.id == 2)
                                {  
                                     //getting image variable and pass var, sprite id to the method
                                    let abc =this.propStore[sprite.id];  
                                    this.trueFalse(sprite.id, abc );  
                                   
                                }
                                
                                 if(sprite.id == 3)
                                {  
                                     //getting image variable and pass var, sprite id to the method
                                        let abc =this.propStore[sprite.id];  
                                        this.trueFalse(sprite.id, abc );
                                }
                               
                                 if(sprite.id == 4)
                                {  
                                     //getting image variable and pass var, sprite id to the method
                                        let abc =this.propStore[sprite.id];  
                                        this.trueFalse(sprite.id, abc );
                                }
                        }
                        // Method for tween zoom in and zoom out of the image
              trueFalse(idValue, imgIdentity){
                                                    // Condition for zoom in
                                                    if(!this.click[idValue])
                                                    {
                                                        this.game.add.tween(imgIdentity.scale).to({x:1, y:1},1500,Phaser.Easing.Back.Out, true);
                                                        this.click[idValue] = true;
                                                    }
                                                   //Condition for zoom out  
                                                        else{
                                                            
                                                                this.game.add.tween(imgIdentity.scale).to({x:.5, y:.5},1500,Phaser.Easing.Back.Out, true);
                                                                this.click[idValue]= false;
                                                            }
                                                       
                                                    this.game.world.bringToTop(imgIdentity);
                                             }
           
            colorBox(X, Y, M){      // Adding color to the respective alpha box

                                            let squareprop = this.game.add.sprite(X,Y,'1',0,this.squareOver);
                                            squareprop.anchor.setTo(.5,.5);
                                            squareprop.scale.setTo(.9,.9);

                                            squareprop.tint = this.colorCode[M];
                                            squareprop.alpha = .5;
                             }

            // Method to disappear a alphabet from word
            disappearAlpha(){

                                 //   for(let i=0; i<10; i++)
                                  if(this.lengthStore.length ==5)
                                 {
                                 while(this.mArray.length <10)
                                            {
                                                // Randomization , push and splice of element
                                                  this.repeat=0;


                                                  if(this.mArray.length>=0 && this.mArray.length<2)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(0, this.lengthStore[0]-1);
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=2 && this.mArray.length<4)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[0], (this.lengthStore[1]+this.lengthStore[0]-1));
                                                      this.disappearExtended();
                                                  }

                                                     if(this.mArray.length>=4 && this.mArray.length<6)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[1]+this.lengthStore[0], (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]-1));
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=6 && this.mArray.length<8)
                                                  {
                                                      this.v = this.game.rnd.integerInRange((this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]),
                                                      (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]+this.lengthStore[3]-1));
                                                      this.disappearExtended();
                                                  }
                                                       if(this.mArray.length>=8 && this.mArray.length<10)
                                                  {
                                                      this.v = this.game.rnd.integerInRange((this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]+this.lengthStore[3]),
                                                      (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]+this.lengthStore[3]+this.lengthStore[4]-1));
                                                      this.disappearExtended();
                                                  }


                                               }
                                    }
                                 if(this.lengthStore.length ==4)
                                 {
                                 while(this.mArray.length < 8)
                                            {
                                                // Randomization , push and splice of element
                                                  this.repeat=0;


                                                  if(this.mArray.length>=0 && this.mArray.length<2)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(0, this.lengthStore[0]-1);
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=2 && this.mArray.length<4)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[0], (this.lengthStore[1]+this.lengthStore[0]-1));
                                                      this.disappearExtended();
                                                  }

                                                     if(this.mArray.length>=4 && this.mArray.length<6)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[1]+this.lengthStore[0], (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]-1));
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=6 && this.mArray.length<8)
                                                  {
                                                      this.v = this.game.rnd.integerInRange((this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]),
                                                      (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]+this.lengthStore[3]-1));
                                                      this.disappearExtended();
                                                  }


                                               }
                                    }

                           if(this.lengthStore.length ==3)
                                 {
                                 while(this.mArray.length < 6)
                                            {
                                                // Randomization , push and splice of element
                                                  this.repeat=0;

                                                  console.log('V= '+this.v);

                                                  if(this.mArray.length>=0 && this.mArray.length<2)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(0, this.lengthStore[0]-1);
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=2 && this.mArray.length<4)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[0], (this.lengthStore[1]+this.lengthStore[0]-1));
                                                      this.disappearExtended();
                                                  }

                                                     if(this.mArray.length>=4 && this.mArray.length<6)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[1]+this.lengthStore[0], (this.lengthStore[0]+this.lengthStore[1]+this.lengthStore[2]-1));
                                                      this.disappearExtended();
                                                  }


                                               }
                                    }
                                    
                                if(this.lengthStore.length ==2)
                                 {
                                 while(this.mArray.length < 4)
                                            {
                                                // Randomization , push and splice of element
                                                  this.repeat=0;

                                                  console.log('V= '+this.v);

                                                  if(this.mArray.length>=0 && this.mArray.length<2)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(0, this.lengthStore[0]-1);
                                                      this.disappearExtended();
                                                  }

                                                    if(this.mArray.length>=2 && this.mArray.length<4)
                                                  {
                                                      this.v = this.game.rnd.integerInRange(this.lengthStore[0], (this.lengthStore[1]+this.lengthStore[0]-1));
                                                      this.disappearExtended();
                                                  }
                                            }
                                 }
                             // For making a complete set of option
                             this.makeOption();

                             }

                             //Method to get a perticular position in grid for disappearing the letter
               disappearExtended(){
                                             let abc = true;
                                            for(let j=0; j<this.textPos.length; j++)
                                                  {
                                                      if(this.textPos[this.v].X == this.textPos[j].X && this.textPos[this.v].Y == this.textPos[j].Y)
                                                      {
                                                          this.repeat++;
                                                      }
                                                  }

                                            for(let j=0; j<this.mArray.length; j++)
                                                  {
                                                      if([this.v] == this.mArray[j])
                                                        {
                                                            abc = false;
                                                        }
                                                      if(!abc)
                                                        {
                                                                break;
                                                        }
                                                  }
                                                  if(abc && this.repeat<2)
                                                  {
                                                             this.disappear.push(this.textPos[this.v]);
                                                             this.mArray.push(this.v);
                                                   }

                              }


             // Method to make a option array containing different alphabet
              makeOption(){

                                let duplicateAlpha = true;
                                let id=0;
                                let c=0;


                                // Put a blank white square over selected alphabet
                                    for(let i=0; i< this.disappear.length; i++)
                                    {
                                        this.textOver = this.game.add.sprite(this.disappear[i].X,this.disappear[i].Y,'1');
                                        this.textOver.anchor.setTo(.5,.5);
										this.textOver.scale.setTo(.9,.9);

                                        this.textOver = this.game.add.sprite(this.disappear[i].X,this.disappear[i].Y,'1');
                                        this.textOver.anchor.setTo(.5,.5);
										this.textOver.scale.setTo(.9,.9);
									    this.textOver.id = id+1;

                                        this.textOver.tint = this.disappear[i].color;
                                        this.textOver.alpha = .5;
                                        this.textArray.push(this.textOver);

                                        this.optionArray.push(this.disappear[i].char);

                                 // Adding dot sprite to the disappear alphabet
                                   this.imgDot1 = this.game.add.sprite(this.disappear[i].X,this.disappear[i].Y,'dot1',0,this.grid);
									       	this.imgDot1.anchor.setTo(.5,.5);
											this.imgDot1.scale.setTo(4,4);
											this.imgDot1.id = c;
											this.imgDot1.flag = 0;
                                            this.imgDot1.alpha=0;
											c++;
											this.panIdOrg.push(this.imgDot1);
                                    }


                                // Add element to the option array to make appropriate option
                                for(let i=0; i<1000; i++)
                                {
                                     duplicateAlpha = true;
                                     let m = this.game.rnd.integerInRange(0, this.alphabet.length-1);
                                     for(let j=0; j<this.optionArray.length ; j++)
                                    {

                                        // Check if random alphabet already existed in the array or not
                                        if( this.alphabet[m] == this.optionArray[j])
                                            {
                                                duplicateAlpha = false;
                                            }

                                    }
                                    //Push alphabet into option array
                                    if(duplicateAlpha)
                                        {
                                            this.optionArray.push(this.alphabet[m]);
                                        }
                                    if(this.optionArray.length == 16)
                                        {
                                            break;
                                        }


                                }


                                this.game.world.bringToTop(this.grid);
                                this.optionLayout();

                           }
                       // Make an option layout containing alphabet
            optionLayout(){


                                       this.option = this.game.add.group();
                                       this.squareAns = this.game.add.group();
                                       this.option = this.game.add.group();
                                       let  optionPosx = this.game.world.centerX-350;
                                       let  optionPosy = this.game.world.centerY+285;
                                       let  optionAddx = 0;
                                       let  optionAddy = 0;
                                        let r =0;
                                        let r1 =1;
                                        let f=0;

                                     // Make a 16 square option with alphabet given in option array
                                    for(var t=0; t<2; t++)
                                        {
                                            for(var e=0; e<8; e++)
                                            {

                                              let  optionRealx = optionPosx+optionAddx;
                                              let  optionRealy = optionPosy+optionAddy;

                                                    this.ans1 = this.game.add.image(optionRealx, optionRealy, '1',0,this.squareAns);
                                                    this.ans1.anchor.setTo(.5,.5);
                                                    this.ans1.scale.setTo(.9,.9);
                                                    this.ans1.tint = 0x000000;
                                                    this.ans1.alpha =.3;
                                                    this.baseFade.push(this.ans1);
                                                    //optionAddx= optionAddx+100;

                                                    //start
                                // Put a answer square
                                this.ans = 'ans'+r;
								this.ans = this.game.add.sprite(optionRealx, optionRealy, '1dark', 0, this.option);
								this.ans.flag = 0;


                                this.ans.id = r;
                                this.ans.inputEnabled = true;
                                this.ans.input.enableDrag();
                                this.ans.anchor.setTo(.5,.5);
                                this.ans.tint = 0x262626;
                                this.ans.scale.setTo(.9,.9);
                                this.game.physics.arcade.enable(this.ans);
                                this.ansName.push(this.ans);


	                 		let style = { font: "32px Oswald", fill: "#ffffff", align: "center" };

                            // Just add alphabet to the given answer square
                            let m = this.game.rnd.integerInRange(0, this.optionArray.length-1);
	                   		this.textOpt = 'pan'+r;
	                   		this.textOpt  = this.game.add.text(optionRealx, optionRealy, this.optionArray[m],style);
							this.textOpt.anchor.setTo(.5,.5);
							this.textOpt.id = r1;
                            this.optionArray.splice(m,1);


							this.panId.push(this.textOpt);
	                   		optionAddx= optionAddx+100;

	                   		r++;
	                   		r1++;
                            f++;

                            //Call method to update position of text according to square
                            this.ans.events.onDragUpdate.add(this.posupdate, this);

                            // Call method to make current option on the top
                             this.ans.events.onDragStart.add(this.onTop, this);

                            // Method call for overlap
                              console.log('this.grid ='+ this.grid.children);
                             this.ans.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, this.grid);}, this);

                            // Storing original position of sprite
                              this.ans.originalPosition = this.ans.position.clone();
                              this.textOpt.originalPosition = this.textOpt.position.clone();

                                            }
                                                optionAddx= 0;
                                                optionAddy =optionAddy+75;
                                         }

                                 }

             // Method for text position over square optiob box
              posupdate(sprite, pointer)
					{
						this.panId[sprite.id].position.x = sprite.position.x;
						this.panId[sprite.id].position.y = sprite.position.y;

					}

               // Method for taking the current sprite on the top
             onTop(sprite)
				{
                    // Add current sprite and respective text to the group
						 this.textOverans.add(sprite);
					     this.textOverans.add(this.panId[sprite.id]);
						 this.game.world.bringToTop(this.textOverans);

				}

        //Drag And Drop function
       stopDrag(currentSprite, outlines) {

							let self = this;  // Store this to the variable so that we can call the main class method
	       					this.textOverans = this.game.add.group(); // Reinitialization of group

        //Checking for overlap with group
   if (!this.game.physics.arcade.overlap(currentSprite, outlines, function() {

       console.log(" inside overlap function ");

            let flag = 0;
            outlines.forEach(function(endSprite) {

                        //Checking for overlap with each group element
                if (!self.game.physics.arcade.overlap(currentSprite, endSprite, function() {

                           let gupta = 0;
                        // Checking for position vacant or not
                          for(let i = 0; i< self.pankaj10.length; i++)
                          {
                                //Check MAtching
                          	if(self.pankaj10[i].id1 == endSprite.id)
                          	{
                          		gupta++;
                          	}
                                        //Check after removal of option
                          				for(let k =0; k<self.pankaj10.length; k++)
							       {
							       		if(self.pankaj10[k].id == currentSprite.id)
                           		        self.pankaj10.splice(k,1);
                                        self.colorChangeBeta(currentSprite, endSprite);
							       }
                          }
                            // Change flag value if option is overlap and drop down
                           flag = 1;

                          // Place the option square to thethe vacent place
                          if(gupta==0)
                          {

                      		 currentSprite.position.copyFrom(endSprite.position);
                             self.panId[currentSprite.id].position.copyFrom(endSprite.position);
						     currentSprite.flag = 1;

                             // Push element into array of drop element
						      	self.pankaj10.push({id:currentSprite.id,id1:endSprite.id});
								console.log(self.pankaj10);
                                self.colorChangeAlpha(currentSprite);

                          }
                          else
                          {

                                //Tween back to original pos if condition not match
		    self.game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
			self.game.add.tween(self.panId[currentSprite.id]).to({x:self.panId[currentSprite.id].originalPosition.x, y:self.panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);


											for(let i =0; i<self.pankaj10.length; i++)
							       {

							       		if(self.pankaj10[i].id == currentSprite.id)
							       		self.pankaj10.splice(i,1);
                                        self.colorChangeBeta(currentSprite);
							       }
                                   console.log(self.pankaj10);

                          }


                         {

                         }


                        }


                    ) )
                {

                }


           });
			if(flag==0)
			{
                
                   //Tween back to original pos if condition not match
				self.game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
				self.game.add.tween(self.panId[currentSprite.id]).to({x:self.panId[currentSprite.id].originalPosition.x, y:self.panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);

                    console.log(self.pankaj10);


				for(let i =0; i<self.pankaj10.length; i++)
       {

       			if(self.pankaj10[i].id == currentSprite.id)
       			self.pankaj10.splice(i,1);
                self.colorChangeBeta(currentSprite);
                  console.log(self.pankaj10);
       }


			}
        },false))

    {


	 self.game.add.tween(currentSprite).to({x:currentSprite.originalPosition.x, y:currentSprite.originalPosition.y}, 1200, Phaser.Easing.Quintic.Out,true);
	 self.game.add.tween(self.panId[currentSprite.id]).to({x:self.panId[currentSprite.id].originalPosition.x, y:self.panId[currentSprite.id].originalPosition.y}, 1200,Phaser.Easing.Quintic.Out,true);

console.log(self.pankaj10);

       for(let i =0; i<self.pankaj10.length; i++)
       {

       		if(self.pankaj10[i].id == currentSprite.id)
       		self.pankaj10.splice(i,1);
            self.colorChangeBeta(currentSprite);
               console.log(self.pankaj10);
       }


    }


}

    //Method for matching and Color changing
       colorChangeAlpha(current, end){
                                            let setFlag1 = 0; let setFlag2 = 0; let setFlag3 = 0; let setFlag4= 0; let setFlag5 = 0;
                                for(let i=0; i<this.disappear.length; i++)
                                {
                                    if(current.position.x == this.disappear[i].X && current.position.y == this.disappear[i].Y )// Check elemet char matching with disapper char
                                        {
                                            console.log(this.panId[current.id].text);
                                            console.log(this.disappear[i].char);
                                           if(this.panId[current.id].text==this.disappear[i].char)
                                           {

                                                this.killArray.push({killerId: current.id, weaponId: i});

                                           }
                                        }
                                }

                       // Getting index value in data variable
                       let data1 = this.getIndexBy(0);
                       let data2 = this.getIndexBy(1);
                       if(data1>=0 && data2>=0)
                       {
                       this.ansName[data1].kill();
                       this.ansName[data2].kill();
                       setFlag1 =1;
                       }

                       let data3 = this.getIndexBy(2);
                       let data4 = this.getIndexBy(3);
                        if(data3>=0 && data4>=0)
                       {
                       this.ansName[data3].kill();
                       this.ansName[data4].kill();
                       setFlag2 =1;
                       }

                       let data5 = this.getIndexBy(4);
                       let data6 = this.getIndexBy(5);
                        if(data5>=0 && data6>=0)
                       {
                       this.ansName[data5].kill();
                       this.ansName[data6].kill();
                       setFlag3 =1;
                       }

                       let data7 = this.getIndexBy(6);
                       let data8 = this.getIndexBy(7);
                        if(data7>=0 && data8>=0)
                       {
                       this.ansName[data7].kill();
                       this.ansName[data8].kill();
                       setFlag4 =1;
                       }

                       let data9 = this.getIndexBy(8);
                       let data10 = this.getIndexBy(9);
                        if(data9>=0 && data10>=0)
                       {
                       this.ansName[data9].kill();
                       this.ansName[data10].kill();
                       setFlag5 =1;
                       }


                       if(this.lengthStore.length == 3)
                       {
                            if(setFlag1 ==1 && setFlag2== 1 && setFlag3==1)
                            {
                                this.endCounter++;
                                this.initializeAgain(); //Remove element of array used in puzzle and reinitialize it

                            }
                       }
                        if(this.lengthStore.length == 4)
                       {

                                if(setFlag1 ==1 && setFlag2== 1 && setFlag3==1 && setFlag4==1)
                            {
                                this.endCounter++;
                                this.initializeAgain(); //Remove element of array used in puzzle and reinitialize it
                            }
                       }
                        if(this.lengthStore.length == 5)
                       {
                                if(setFlag1 ==1 && setFlag2== 1 && setFlag3==1 && setFlag4==1 && setFlag5==1)
                            {
                                this.endCounter++;
                                this.initializeAgain(); //Remove element of array used in puzzle and reinitialize it
                            }
                       }


                    }
                    
     colorChangeBeta(current){
                                       for(let i=0; i< this.killArray.length; i++)
                                            {
                                                if(current.id == this.killArray[i].killerId)// Check elemet char matching with disapper char
                                                    {
                                                            this.killArray.splice(i,1);
                                                
                                                    }
                                                
                                            }
         
                                        console.log('kill array =');
                                        console.log(this.killArray)
                                 }
                         
                          //Method for getting index variable
     getIndexBy(value) {
                         for (var i = 0; i < this.killArray.length ; i++)
                                {
                                    if (this.killArray[i].weaponId == value)
                                    {
                                        return this.killArray[i].killerId;

                                    }
                                }
                                 return -1;
                        }
         //For new stage re initialize Array and Groups
         initializeAgain(){
                                   for(let i=0; i<this.gridArray.length; i++)
                                    {
                                        this.gridArray[i].kill();
                                    }
                                      for(let i=0; i<this.ansName.length; i++)
                                    {
                                        this.ansName[i].kill();
                                    }
                                    for(let i=0; i<this.baseFade.length;i++)
                                    {
                                        this.baseFade[i].kill();
                                    }
                                    for(let i=0; i<this.textArray.length; i++)
                                    {
                                        this.textArray[i].kill();
                                    }
                                    this.bg.kill();
                                    this.panel.kill();
                                    this.home1.kill();
                                    this.game._home.kill();  
                                
                                this.squarePos.splice(0, this.squarePos.length);
                                this.panId.splice(0, this.panId.length);
						    	this.ansName.splice(0, this.ansName.length);
	                            this.panIdOrg.splice(0,this.panIdOrg.length);
					    		this.pankaj10.splice(0, this.pankaj10.length);
                                this.contentArray.splice(0,this.contentArray.length);
                                this.contentPart.splice(0,this.contentPart.length);
                                this.killArray.splice(0,this.killArray.length);
                                this.disappear.splice(0,this.disappear.length);
                                this.contentMain.splice(0,this.contentMain.length);
                                this.mArray.splice(0,this.mArray.length);
                                this.checkIndexArr.splice(0,this.checkIndexArr.length);
                                this.unmatchArr.splice(0,this.unmatchArr.length);
                                this.lengthStore.splice(0,this.lengthStore.length);
                                this.optionArray.splice(0,this.optionArray.length);
                                this.propStore.splice(0,this.propStore.length);
                                this.imageStore.splice(0,this.imageStore.length);
                         
                             

                                this.colorCode = [];
                                this.alphabet = [];
                                this.colorCode = [0xe60000,0xffd200,0x2da8f6,0x5fea3a,0x7825c1];
                                this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

                                this.textOverans.remove();
					    		this.grid.remove();
								this.squareAns.remove();
                       			this.option.remove();

                                    
                                    if(this.currentLevel == this.levelStage.level1)
                                    {
                                        if(this.endCounter == 1)
                                        {
                                            this.contentArray = [];
                                            this.currentLevel = this.levelStage.level2;
                                            this.endCounter = 0;
                                            this.game.world.removeAll();
                                            this.Level2();
                                        }
                                        else{
                                                 this.game.world.removeAll();
                                                 this.Level1();
                                           }
                                    }

                                     else if(this.currentLevel == this.levelStage.level2)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level3;
                                                this.endCounter = 0;
                                                this.game.world.removeAll()
                                                this.Level3();
                                            }
                                        else{
                                            this.game.world.removeAll();
                                                 this.Level2();
                                            }
                                    }
                                    
                                     else if(this.currentLevel == this.levelStage.level3)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level4;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level4();
                                            }
                                        else{
                                            this.game.world.removeAll();
                                                 this.Level3();
                                            }
                                    }
                                     
                                       else if(this.currentLevel == this.levelStage.level4)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level5;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level5();
                                            }
                                        else{
                                                 this.game.world.removeAll();
                                                 this.Level4();
                                            }
                                    }
                                    
                                        else if(this.currentLevel == this.levelStage.level5)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level6;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level6();
                                            }
                                        else{
                                                this.game.world.removeAll();
                                                 this.Level5();
                                            }
                                    }
                                    
                                       else if(this.currentLevel == this.levelStage.level6)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level7;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level7();
                                            }
                                        else{
                                                this.game.world.removeAll();
                                                 this.Level6();
                                            }
                                    }
                                    
                                       else if(this.currentLevel == this.levelStage.level7)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level8;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level8();
                                            }
                                        else{
                                                this.game.world.removeAll();
                                                 this.Level7();
                                            }
                                    }
                                    
                                       else if(this.currentLevel == this.levelStage.level8)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevel = this.levelStage.level9;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                this.Level9();
                                            }
                                        else{
                                                this.game.world.removeAll();
                                                 this.Level8();
                                            }
                                    }
                                    
                                        else if(this.currentLevel == this.levelStage.level9)
                                    {

                                        if(this.endCounter == 1)
                                            {
                                                this.game.world.removeAll();
                                                 this.game.state.start('MenuState');
                                            }
                                        else{
                                                this.game.world.removeAll();
                                                 this.Level9();
                                            }
                                    }
                                    



         }
         
       /*  levelChange(){
                            let actual =  this.currentLevelIndex;
                            if(this.endCounter == 1)
                                            {
                                                this.contentArray = [];
                                                this.currentLevelIndex++
                                                let increment =  this.currentLevelIndex++
                                                this.currentLevel = increment;
                                                this.currentLevelIndex--;
                                                this.endCounter = 0;
                                                this.game.world.removeAll();
                                                let X = this.levelStage[increment];
                                                this.X();
                                            }
                                        else{
                                                  this.levelStage[actual]();
                                            } 
             
             
                     }*/
    
}

export default GameState;

